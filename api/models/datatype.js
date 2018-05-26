/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
// Datatype schema
const DatatypeSchema = mongoose.Schema({
  name: String,

});

const { statics: Statics, methods: Methods } = DatatypeSchema;


module.exports = mongoose.model('Datatype', DatatypeSchema);
