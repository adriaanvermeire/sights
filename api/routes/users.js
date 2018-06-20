/* eslint-disable no-shadow */
const { auth } = require('./middleware');

const express = require('express');
const validate = require('express-validation');
const validation = require('./validation');

const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Sight = require('../models/sight');

// register
router.post('/register', validate(validation.register), (req, res) => {
  const {
    email, username, password, passwordVerification,
  } = req.body;
  if (password === passwordVerification) {
    const newUser = new User({
      email, username, password,
    });

    User.addUser(newUser, (err) => {
      if (err) {
        let msg = 'Failed to register user';
        if (err.code === 11000) {
          let type = 'none';
          if (err.message.includes('email')) { msg = 'Email already in use.'; type = 'email'; }
          if (err.message.includes('username')) { msg = 'Username already in use.'; type = 'username'; }
          res.json({ success: false, msg, type });
        } else {
          res.json({ success: false, msg });
        }
      } else {
        res.json({ success: true, msg: 'User registered' });
      }
    });
  } else {
    res.json({ success: false, msg: 'Passwords do not match.' });
  }
});

// authenticate
router.post('/authenticate', validate(validation.login), (req, res) => {
  const { email, password } = req.body;
  const msg = 'The email and/or password you entered were not correct.';

  User.getUserByField('email', email, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, msg });
    } else {
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign(user.toJSON(), process.env.SECRET, {
            expiresIn: 604800, // 1 week
          });
          const {
            id, username, email,
          } = user;
          res.json({
            success: true,
            token: `JWT ${token}`,
            user: {
              id, username, email,
            },
          });
        } else {
          res.json({ success: false, msg });
        }
      });
    }
  });
});

// profile
router.get('/profile', auth, async (req, res) => {
  const user = await req.user.populate({
    path: 'likes', model: Sight, select: '-charts', populate: [{ path: 'author', select: 'username -_id' }, { path: 'category', select: 'name -_id' }],
  }).execPopulate();
  res.json({ user });
});

router.get('/', async (req, res) => {
  const SIGHTS_LIMIT = 5;
  const { u } = req.query;
  const users = await User.publicProfile(u);
  const profile = users[0];
  let likes = 0;
  if (profile.sights) {
    profile.sights.sort((a, b) => a.likes.length < b.likes.length);
    for (const sight of profile.sights) {
      likes += sight.likes.length;
      sight.category = sight.category[0].name;
      sight.likeCount = sight.likes.length;
      sight.objectID = `${sight._id}`;
      delete sight._id;
    }
    const sightCount = profile.sights.length || 0;
    const limit = sightCount > SIGHTS_LIMIT ? SIGHTS_LIMIT : sightCount;
    const rest = sightCount - limit;
    const limit2 = limit + (rest > limit * 2 ? limit * 2 : rest);
    profile.top = profile.sights.slice(0, limit);
    if (sightCount > SIGHTS_LIMIT) { profile.other = profile.sights.slice(limit, limit2); }
  }
  profile.likes = likes;
  res.send({ success: !!profile, profile });
});

module.exports = router;
