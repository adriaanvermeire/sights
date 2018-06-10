/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');
const Chart = require('./chart');

const { ObjectId } = mongoose.Schema.Types;
// Sight schema
const SightSchema = mongoose.Schema({
  author: { type: ObjectId, ref: 'User' },
  dataset: { type: ObjectId, ref: 'Dataset', required: true },
  name: { type: String, required: true, index: true },
  category: { type: ObjectId, ref: 'Category' },
  charts: [{ type: ObjectId, ref: 'Chart' }],
}, { timestamps: true });

const { statics: Statics, methods: Methods } = SightSchema;


// Document Methods

Methods.generateUnivariateGraphs = async function generateUnivariateGraphs() {
  const { dataset } = (await this.populate('dataset').execPopulate());
  const fields = Object.keys(dataset.data);
  const charts = [];
  for (const field of fields) {
    if (!(dataset.ignoreCols.includes(field))) {
      const fieldData = dataset.data[field];
      charts.push(Chart.createUnivariate({ data: fieldData, field }));
    }
  }
  this.charts = await Promise.all(charts);
  console.log('univariate done');
  await this.save();
};

Methods.generateBivariateGraphs = async function generateBivariateGraphs() {
  const { dataset } = await this.populate('dataset').execPopulate();
  const fields = Object.keys(dataset.data);
  const independents = fields.filter(field => dataset.data[field].isSteady);
  const dependents = fields.filter(field => !dataset.data[field].isSteady &&
                                            !dataset.data[field].isVolatile &&
                                            !(dataset.ignoreCols.includes(field)));

  const charts = [];
  const chartPromises = [];
  for (const dep of dependents) {
    for (const indep of independents) {
      if (indep !== dep && !charts.includes([indep, dep]) && !charts.includes([dep, indep])) {
        charts.push([indep, dep]);
        const data = [];
        data.push(dataset.data[indep].originalValues);
        data.push(dataset.data[dep].originalValues);
        chartPromises.push(Chart.createBivariate({ data, fields: [indep, dep] }));
      }
    }
  }
  this.charts.push(...await Promise.all(chartPromises));
  console.log('bivariate done');
  await this.save();
};


// Statics

Statics.getSightById = function getSightById(id) {
  return this.findById(id).lean().exec()
    .then(sight => sight)
    .catch(e => console.log(e));
};

// TODO: Implement better method for getting featured sights
Statics.filter = function filter(query) {
  const { category } = query;
  const q = {
    category: ObjectId(category),
  };
  return this.find({ category: { $regex: query.category || '' } }, 'name')
    .populate({ path: 'author', select: 'username -_id' })
    .populate({ path: 'category', select: 'name -_id' }).lean()
    .exec()
    .then(data => data)
    .catch(e => ({ err: e }));
};

Statics.create = function create(data) {
  const {
    dataset, category, author, name,
  } = data;

  const sight = new this({
    dataset, category, author, name,
  });

  return sight.save();
};

module.exports = mongoose.model('Sight', SightSchema);
