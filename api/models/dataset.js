/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
// Dataset schema
const DatasetSchema = mongoose.Schema({
  originalName: String,
  mimetype: String,
  filename: String,
  path: String,
  size: Number,
}, { timestamps: true });

const Dataset = module.exports = mongoose.model('Dataset', DatasetSchema);

module.exports.getDatasetById = (id, callback) => {
  Dataset.findById(id, callback);
};

module.exports.addDataset = (dataset, callback) => {
  const newSet = dataset;
};
