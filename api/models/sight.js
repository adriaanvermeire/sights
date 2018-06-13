/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');
const algoliasearch = require('algoliasearch');
const Chart = require('./chart');
const { clean } = require('../utils');

const { ObjectId: SchemaId } = mongoose.Schema.Types;
const { ObjectId } = mongoose.Types;
// Sight schema
const SightSchema = mongoose.Schema({
  author: { type: SchemaId, ref: 'User' },
  dataset: { type: SchemaId, ref: 'Dataset', required: true },
  name: { type: String, required: true },
  category: { type: SchemaId, ref: 'Category' },
  charts: [{ type: SchemaId, ref: 'Chart' }],
  likes: [String], // Object id's of users who liked
}, { timestamps: true });

SightSchema.index(
  { name: 'text', 'category.name': 'text', 'author.username': 'text' },
  { weights: { name: 3, 'category.name': 2, 'author.username': 1 } },
);

const client = algoliasearch('OQTWW0B4H3', '0c7e2911c7ac282807c7e09e3c387ee2');
const algolia = client.initIndex('sights');

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

Methods.like = async function like(user) {
  const _id = user._id.toString();
  if (this.author.toString() !== _id) {
    if (!this.likes.includes(_id)) {
      this.likes.push(_id);
      user.likes.push(this._id);
    } else {
      this.likes.splice(this.likes.indexOf(_id), 1);
      user.likes.splice(user.likes.indexOf(this._id), 1);
    }
    await Promise.all([this.save(), user.save()]);
    this.updateAlgolia();
  }
  return this.likes.length;
};

Methods.addToAlgolia = async function addToAlgolia() {
  const sight = await this.populate('author').populate('category').execPopulate();
  algolia.addObject({
    objectID: sight.id,
    name: sight.name,
    author: sight.author.username,
    category: sight.category.name,
    likes: sight.likes,
    likeCount: sight.likes.length,
  }, (err) => {
    if (err) throw err;
  });
};

Methods.updateAlgolia = async function updateAlgolia() {
  const sight = await this.populate('author').populate('category').execPopulate();
  algolia.saveObject({
    objectID: sight.id,
    name: sight.name,
    author: sight.author.username,
    category: sight.category.name,
    likes: sight.likes,
    likeCount: sight.likes.length,
  }, (err) => {
    if (err) throw err;
  });
};

// Statics

Statics.getSightById = function getSightById(id) {
  return this.findById(id).lean().exec()
    .then(sight => sight)
    .catch(e => console.log(e));
};

// TODO: Implement better method for getting featured sights
Statics.filter = async function filter(query, user) {
  const category = query.category ? ObjectId(query.category) : undefined;
  const q = {
    category,
  };
  clean(q);
  const sights = await this.find(q, 'name likes')
    .populate({ path: 'author', select: 'username -_id' })
    .populate({ path: 'category', select: 'name -_id' })
    .lean()
    .exec();

  if (user) {
    for (const sight of sights) {
      sight.liked = sight.likes.includes(user.id);
    }
  }
  return sights;
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
