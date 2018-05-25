/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
// Category schema
const CategorySchema = mongoose.Schema({
}, { timestamps: true });

const Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.getCategoryById = (id, callback) => {
  Category.findById(id, callback);
};
