/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
// Chart schema
const ChartSchema = mongoose.Schema({
}, { timestamps: true });

const Chart = module.exports = mongoose.model('Chart', ChartSchema);

module.exports.getChartById = (id, callback) => {
  Chart.findById(id, callback);
};
