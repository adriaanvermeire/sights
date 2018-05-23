/* eslint-disable no-shadow */
const express = require('express');
const validate = require('express-validation');
const validation = require('./validation');

const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

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
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
