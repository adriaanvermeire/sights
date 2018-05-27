/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User schema
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const { statics: Statics, methods: Methods } = UserSchema;

// Document Methods

// Statics

Statics.getUserById = function getUserById(id, callback) {
  return this.findById(id, callback);
};

Statics.getUserByField = function getUserByField(field, value, callback) {
  const query = { [field]: value };
  return this.findOne(query, callback);
};

Statics.addUser = function addUser(user, callback) {
  const newUser = user;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

Statics.comparePassword = function comparePassword(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
