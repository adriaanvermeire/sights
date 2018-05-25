/* eslint-disable no-shadow */
const express = require('express');

const router = express.Router();
const Category = require('../models/category');

// TODO: implement ADMIN middleware
router.post('/', (req, res) => {
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
