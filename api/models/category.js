/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');

// Category schema
const CategorySchema = mongoose.Schema({
  name: { type: String, required: true, index: true },
}, { timestamps: true });

const { statics: Statics, methods: Methods } = CategorySchema;


// Document methods

// Statics

Statics.getCategoryById = (id, callback) => this.findById(id, callback);

Statics.all = callback => this.find({}, callback);

module.exports = mongoose.model('Category', CategorySchema);
