/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');

const { longestCategory } = require('../utils');
// Chart schema
const ChartSchema = mongoose.Schema({
  type: { type: String },
  data: [],
  fields: [String],
  univariate: { type: Boolean, default: true },
  markers: { type: Boolean, default: true },
}, { timestamps: true });

const { statics: Statics, methods: Methods } = ChartSchema;


// Document methods

Methods.figureOutType = function figureOutType() {
  //     if (fieldData.isBinary) type = 'bar';
  //     else if (fieldData.type === 'timestamp') type = 'line';
  //     else if (/number$/.test(fieldData.type)) type = 'area';
  //     else type = pickRandom(['pie', 'donut']);
  let type = '';
  if (this.univariate) {
    if (this.data[0].uniqueValues < 7 && longestCategory(this.data[0].counts) < 8) {
      type = 'column';
    } else if (this.data[0].uniqueValues < 16) {
      if (this.data[0].total > 20) { type = 'bar'; }
    } else if (/number$/.test(this.data[0].type)) {
      if (this.data[0].isSteady) {
        type = 'area';
        if (this.data[0].total > 20) this.markers = false;
      } else {
        type = 'line';
        if (this.data[0].total > 20) this.markers = false;
      }
    } else {
      type = 'bar';
    }
  } else { // Bivariate (two fields)
    type = 'line';
  }
  this.changeType(type);
};

Methods.changeType = function changeType(type) {
  this.type = type;
  this.save();
};

// Statics

Statics.getChartById = function getChartById(id, callback) {
  this.findById(id, callback);
};

Statics.createUnivariate = async function createUnivariate({ data, field }) {
  const dataArray = [];
  dataArray.push(data);
  const chart = new this({ data: dataArray, fields: [field] });
  await chart.figureOutType();
  return chart.save();
};

Statics.createBivariate = async function createBivariate({ data, fields }) {
  const chart = new this({ data, fields, univariate: false });
  await chart.figureOutType();
  return chart.save();
};

module.exports = mongoose.model('Chart', ChartSchema);
