/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
// Sight schema
const SightSchema = mongoose.Schema({

}, { timestamps: true });

const Sight = module.exports = mongoose.model('Sight', SightSchema);

module.exports.getSightById = (id, callback) => {
  Sight.findById(id, callback);
};
