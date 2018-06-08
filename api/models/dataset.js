/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
/* eslint-disable no-restricted-syntax */
const ORDINAL = /number$/;

const mongoose = require('mongoose');
const csv = require('csvtojson');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const {
  countOccurences, getUniqueValues, getVolatility, isNumberType, getSum, calculateMedian,
  getExtremes, getStandardDeviation, countRelativeOccurences,
} = require('../utils');

const { Mixed } = mongoose.Schema.Types;
// Dataset schema
const DatasetSchema = mongoose.Schema({
  originalName: String,
  mimetype: String,
  filename: String,
  path: String,
  size: Number,
  ignoreCols: [String],
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
  const ignoreCols = [];

  for (const key of keys) {
    const missingForKey = [];
    const values = this.data[key];
    const total = values.length;
    this.fields.push({ name: key });
    this.data[key].map((d, i) => { if (!d) missingForKey.push(i); return d; });
    if (missingForKey.length >= total * 0.7) {
      ignoreCols.push(key);
    }
    this.data[key] = { values, total: total - missingForKey.length, missing: missingForKey };
  }
  // values that aren't filled in correctly will be ignored
  this.ignoreCols = ignoreCols;

  // When updating a Mixed field in mongoose you have to mark it modified to retain the changes
  this.markModified('data');
};

Methods.generalAnalysis = function generalAnalysis(fieldData) {
  const { total, values } = fieldData;
  const counts = countOccurences(values);
  const uniqueValues = getUniqueValues(counts);
  const relativeCounts = countRelativeOccurences(counts, total);
  const isBinary = uniqueValues === 2;
  const { isSteady, isVolatile } = getVolatility(uniqueValues, total);
  if (uniqueValues >= total * 0.9) this.ignoreCols.push(fieldData.name);
  return {
    ...fieldData, counts, uniqueValues, relativeCounts, isBinary, isSteady, isVolatile,
  };
};

Methods.nominalAnalysis = function nominalAnalysis(fieldData) {
  fieldData.counts.sort((a, b) => b[0] - a[0]);
  return fieldData;
};

Methods.ordinalAnalysis = function ordinalAnalysis(fieldData) {
  let { values } = fieldData;
  const { total } = fieldData;
  values = values.map(v => Number(v.replace(',', '.')));
  fieldData.counts.sort((a, b) => a[0] - b[0]);
  const sum = values.reduce(getSum).toFixed(2);
  const mean = +(sum / total).toFixed(2);
  const median = calculateMedian(values);
  const { min, max } = getExtremes(values);
  const stdDeviation = getStandardDeviation(values, mean).toFixed(2);
  return {
    ...fieldData, sum, mean, median, min, max, stdDeviation,
  };
};

Methods.handleMissingData = function handleMissingData(fieldData) {
  // pairwise deletion
  const values = fieldData.values.filter((v, i) => !(fieldData.missing.includes(i)));
  // TODO: implement more ways to handle the missing of data
  // mean imputation
  // mode imputation
  // median imputation
  return { ...fieldData, values };
};

Methods.postAnalysis = async function postAnalysis() {
  for (const { name, type } of this.fields) {
    if (!(name in this.ignoreCols)) {
      let fieldData = this.data[name];
      fieldData.name = name;
      fieldData.originalValues = [fieldData.values];
      if (fieldData.missing.length) {
        fieldData = this.handleMissingData(fieldData);
      }
      fieldData.type = type;
      fieldData = this.generalAnalysis(fieldData);

      if (ORDINAL.test(type)) { // ORDINAL DATA
        fieldData = this.ordinalAnalysis(fieldData);
      } else { // NOMINAL DATA
        fieldData = this.nominalAnalysis(fieldData);
      }
      this.data[name] = fieldData;
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
