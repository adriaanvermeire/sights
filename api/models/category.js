/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');

// Category schema
const CategorySchema = mongoose.Schema({
  name: { type: String, required: true, index: true },
}, { timestamps: true });

const Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.getCategoryById = (id, callback) => {
  Category.findById(id, callback);
};
