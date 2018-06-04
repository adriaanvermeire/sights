/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');

const { longestCategory } = require('../utils');
// Chart schema
const ChartSchema = mongoose.Schema({
  type: String,
  data: Object,
  fields: [String],
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
  if (this.fields.length === 1) {
    if (this.data.uniqueValues < 7 && longestCategory(this.data.counts) < 8) {
      type = 'column';
    } else if (this.data.uniqueValues < 16) {
      if (this.data.total > 20) { type = 'bar'; }
    } else if (/number$/.test(this.data.type)) {
      if (this.data.isSteady) {
        type = 'area';
        if (this.data.total > 20) this.markers = false;
      } else {
        type = 'line';
        if (this.data.total > 20) this.markers = false;
      }
    } else {
      type = 'bar';
    }
  } else { // comparative chart

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

Statics.createSimple = async function createSimple({ data, field }) {
  const chart = new this({ data, fields: [field] });
  await chart.figureOutType();
  return chart.save();
};

module.exports = mongoose.model('Chart', ChartSchema);
