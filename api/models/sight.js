/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
// Sight schema
const SightSchema = mongoose.Schema({
  author: { type: ObjectId, ref: 'User' },
  dataset: { type: ObjectId, ref: 'Dataset', required: true },
  name: { type: String, required: true, index: true },
  category: { type: ObjectId, ref: 'Category' },
  charts: [{ type: ObjectId, ref: 'Chart' }],
}, { timestamps: true });

const { statics: Statics, methods: Methods } = SightSchema;


// Document Methods

// Statics

Statics.getSightById = function getSightById(id) {
  return this.findById(id).exec()
    .then(sight => sight)
    .catch(e => console.log(e));
};

// TODO: Implement better method for getting featured sights
Statics.featured = function featured() {
  return this.find({}).exec()
    .then(data => data)
    .catch(e => ({ err: e }));
};

Statics.create = function create(data) {
  const {
    dataset, category, author, name,
  } = data;

  const sight = new this({
    dataset, category, author, name,
  });

  return sight.save();
};

module.exports = mongoose.model('Sight', SightSchema);
