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

const { statics: Statics, methods: Methods } = SightSchema;


// Document Methods

// Statics

Statics.getSightById = (id, cb) => this.findById(id, cb);

// TODO: Implement better method for getting featured sights
Statics.featured = cb => this.find({}, cb);

module.exports = mongoose.model('Sight', SightSchema);
