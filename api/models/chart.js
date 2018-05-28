/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
// Chart schema
const ChartSchema = mongoose.Schema({
}, { timestamps: true });

const { statics: Statics, methods: Methods } = ChartSchema;


// Document methods

// Statics

Statics.getChartById = function getChartById(id, callback) {
  this.findById(id, callback);
};

module.exports = mongoose.model('Chart', ChartSchema);
