/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');
const csv = require('csvtojson');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const { ObjectId, Mixed } = mongoose.Schema.Types;
// Dataset schema
const DatasetSchema = mongoose.Schema({
  originalName: String,
  mimetype: String,
  filename: String,
  path: String,
  size: Number,
  columns: [{
    column: String,
    type: { type: ObjectId, ref: 'Datatype' },
  data: Mixed,
  }],
}, { timestamps: true });

const { statics: Statics, methods: Methods } = DatasetSchema;

// Document Methods

Methods.parse = (cb) => {
  // use this
};

// Statics

Statics.getDatasetById = function getDatasetById(id, cb) {
  this.findById(id, cb);
};

Statics.create = function create(data) {
  const {
    originalName, mimetype, filename, path, size,
  } = data;

  const dataset = new this({
    originalName, mimetype, filename, path, size,
  });

  return dataset.save();
};


module.exports = mongoose.model('Dataset', DatasetSchema);
