/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');
const csv = require('csvtojson');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const {
  countOccurences, getUniqueValues, getVolatility, isNumberType, getSum, calculateMedian,
  getExtremes, getStandardDeviation, countRelativeOccurences,
} = require('../utils');

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
  entrypoint: String,
}, { timestamps: true });

const { statics: Statics, methods: Methods } = DatasetSchema;

// Document Methods

Methods.preAnalysis = function preAnalysis() {
  const keys = Object.keys(this.data);
  for (const key of keys) {
    const data = this.data[key];
    const total = data.length;
    const counts = countOccurences(data);
    const relativeCounts = countRelativeOccurences(counts, total);
    const uniqueValues = getUniqueValues(counts);
    const isBinary = uniqueValues === 2;
    const { isSteady, isVolatile } = getVolatility(uniqueValues, total);
    this.fields.push({ name: key });
    this.data[key] = {
      data, total, counts, isSteady, isVolatile, isBinary, relativeCounts,
    };
  }
  // When updating a Mixed field in mongoose you have to mark it modified to retain the changes
  this.markModified('data');
};

Methods.postAnalysis = function postAnalysis() {
  const numberFields = this.fields.filter(isNumberType);
  if (numberFields.length) {
    for (const { name } of numberFields) {
      const fieldData = this.data[name];
      fieldData.data = fieldData.data.map(Number);
      const sum = fieldData.data.reduce(getSum);
      const mean = sum / fieldData.total;
      const median = calculateMedian(fieldData.data);
      const { min, max } = getExtremes(fieldData.data);
      const stdDeviation = getStandardDeviation(fieldData.data, mean);
      this.data[name] = {
        ...fieldData, sum, mean, median, min, max, stdDeviation,
      };
    }
  }
  // When updating a Mixed field in mongoose you have to mark it modified to retain the changes
  this.markModified('data');
};

Methods.parse = async function parse() {
  let data = [];
  try {
    if (this.mimetype === 'text/csv') {
      data = await csv({ delimiter: 'auto' }).fromFile(this.path);
    } else if (this.mimetype === 'application/json') {
      const rawData = await fs.readFileAsync(this.path);
      data = JSON.parse(rawData);
      if (this.entrypoint) {
        data = data[this.entrypoint];
      }
    }
    if (data && data.length) {
      this.data = {};
      for (let i = 0; i < data.length; i += 1) {
        for (const k in data[i]) {
          if (k) {
            const v = data[i][k];
            if (this.data[k]) { this.data[k].push(v); } else { this.data[k] = [v]; }
          }
        }
      }

      this.preAnalysis();
      return this.save()
        .then(set => ({ success: true, data: set.data }));
    }
    if (this.mimetype === 'application/json') {
      if (this.entrypoint) {
        return { success: false, err: 'The entrypoint you supplied doesn\'t work with this dataset. Try another value.' };
      }
      return { success: false, err: 'No data was found in your dataset. Try using an entrypoint for your JSON.' };
    }
    return { success: false, err: 'No data was found in your dataset. Check if your CSV is correctly formatted.' };
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
    originalName, mimetype, filename, path, size, entrypoint,
  } = data;

  const dataset = new this({
    originalName, mimetype, filename, path, size, entrypoint,
  });

  return dataset.save();
};


module.exports = mongoose.model('Dataset', DatasetSchema);
