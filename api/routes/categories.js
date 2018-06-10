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

router.get('/', async (req, res) => {
  const categories = await Category.all();
  return res.send({ categories });
});

module.exports = router;
