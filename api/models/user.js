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
  likes: [String], // Object id's for posts liked by the user
  picture: String,
}, { timestamps: true });

const { statics: Statics, methods: Methods } = UserSchema;

// Document Methods

// Statics

Statics.publicProfile = async function publicProfile(username) {
  const user = await this.aggregate([
    { $match: { username } },
    {
      $lookup: {
        from: 'sights',
        localField: '_id',
        foreignField: 'author',
        as: 'sights',
      },
    }]).exec();
  let result;
  if (user[0] && user[0].sights && user[0].sights.length) {
    result = await this.aggregate([
      { $match: { username } },
      {
        $lookup: {
          from: 'sights',
          localField: '_id',
          foreignField: 'author',
          as: 'sights',
        },
      },
      {
        $unwind: '$sights',
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'sights.category',
          foreignField: '_id',
          as: 'sights.category',
        },
      },
      {
        $group: {
          _id: '$_id',
          username: { $first: '$username' },
          sights: { $push: '$sights' },
        },
      },
      {
        $project: {
          username: 1,
          picture: 1,
          'sights.views': 1,
          'sights.name': 1,
          'sights.category': 1,
          'sights.likes': 1,
          'sights._id': 1,
          views: {
            $sum: '$sights.views',
          },
        },
      },
    ]).exec();
  } else {
    result = await this.aggregate([
      { $match: { username } },
      {
        $project: {
          username: 1,
          picture: 1,
        },
      },
    ]).exec();
  }
  return result;
};

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
