/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
/* eslint-disable no-restricted-syntax */
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
  data: Mixed,
  fields: [{
    name: String,
    type: { type: String },
  }],
}, { timestamps: true });

const { statics: Statics, methods: Methods } = DatasetSchema;

// Document Methods

Methods.parse = async function parse() {
  let data = [];
  try {
    if (this.mimetype === 'text/csv') {
      data = await csv({ delimiter: 'auto' }).fromFile(this.path);
    } else if (this.mimetype === 'application/json') {
      const rawData = await fs.readFileAsync(this.path);
      data = JSON.parse(rawData);
    }
    this.data = {};
    for (let i = 0; i < data.length; i += 1) {
      for (const k in data[i]) {
        if (k) {
          const v = data[i][k];
          if (this.data[k]) { this.data[k].push(v); } else { this.data[k] = [v]; }
        }
      }
    }
    return this.save()
      .then(set => set.data)
      .then((data) => {
        const keys = Object.keys(data);
        console.log(keys);
        for (let i = 0; i < keys.length; i += 1) {
          console.log(keys[i]);
          this.fields.push({
            name: keys[i],
          });
        }
      })
      .then(() => this.save())
      .then(set => set.data);
  } catch (e) {
    console.log(e);
    throw new Error(400);
  }
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
