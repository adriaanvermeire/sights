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
  data: Object,
  columns: [{
    column: String,
    type: { type: ObjectId, ref: 'Datatype' },
  }],
}, { timestamps: true });

const { statics: Statics, methods: Methods } = DatasetSchema;

// Document Methods

Methods.parse = (cb) => {
  // use this
};

// Statics

Statics.getDatasetById = (id, cb) => {
  this.findById(id, cb);
};


module.exports = mongoose.model('Dataset', DatasetSchema);
