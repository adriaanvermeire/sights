/* eslint-disable no-shadow */
const express = require('express');
const validate = require('express-validation');
const validation = require('./validation');

const router = express.Router();
const Category = require('../models/category');

// TODO: implement ADMIN middleware
router.post('/', validate(validation.category), (req, res) => {
  const cat = new Category({
    name: req.body.name,
  });

  cat.save();

  res.send({ success: true, msg: 'Category added successfully!' });
});

router.get('/', (req, res) => {
  Category.all((err, categories) => {
    if (categories) {
      return res.send({ categories });
    } return res.sendStatus(401);
  });
});

module.exports = router;
