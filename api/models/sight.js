/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
// Sight schema
const SightSchema = mongoose.Schema({
  author: { type: ObjectId, ref: 'User' },
  dataset: { type: ObjectId, required: true },
  name: { type: String, required: true, index: true },
  category: { type: ObjectId, ref: 'Category' },
  charts: [{ type: ObjectId, ref: 'Chart' }],
}, { timestamps: true });

const Sight = module.exports = mongoose.model('Sight', SightSchema);

module.exports.getSightById = (id, callback) => {
  Sight.findById(id, callback);
};
