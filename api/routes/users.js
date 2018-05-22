/* eslint-disable no-shadow */
const express = require('express');

const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// register
router.post('/register', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  User.addUser(newUser, (err) => {
    if (err) {
      res.json({ succes: false, msg: 'Failed to register user' });
    } else {
      res.json({ succes: true, msg: 'User registered' });
    }
  });
});

// authenticate
router.post('/authenticate', (req, res) => {
  const { username, password } = req.body;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ succes: false, msg: 'User not found' });
    } else {
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign(user.toJSON(), process.env.SECRET, {
            expiresIn: 604800, // 1 week
          });

          res.json({
            succes: true,
            token: `JWT ${token}`,
            user: {
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
            },
          });
        } else {
          res.json({ succes: false, msg: 'Wrong password' });
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
