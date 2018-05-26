/* eslint-disable no-shadow */
const { auth } = require('./middleware');

const express = require('express');
const validate = require('express-validation');
const validation = require('./validation');
const multer = require('multer');

const router = express.Router();
const dest = `${process.env.UPLOADS}/` || 'uploads/';
const upload = multer({ dest });

const Dataset = require('../models/dataset');
const Sight = require('../models/sight');

const routeMiddlewareNew = [
  auth,
  upload.single('dataset'),
  validate(validation.sight),
];
router.post('/new', routeMiddlewareNew, (req, res) => {
  // req.file is the `dataset` file
  // req.body will hold the text fields, if there were any
  const {
    originalName, mimetype, filename, path, size,
  } = req.file;

  const newDataset = new Dataset({
    originalName, mimetype, filename, path, size,
  });

  newDataset.save();

  const newSight = new Sight({
    dataset: newDataset._id,
    category: req.body.category,
    author: req.user._id,
    name: req.body.name,
  });

  newSight.save();
  res.send({ success: true, data: newSight });
});

router.get('/explore', (req, res) => {
  Sight.featured((err, sights) => {
    if (sights && sights.length > 0) {
      res.send({ sights });
    } else {
      res.status(404).send({ success: false });
    }
  });
});

router.get('/:sightId', (req, res) => {
  Sight.getSightById(req.params.sightId, (err, sight) => {
    if (sight) {
      return res.send({ sight });
    }
    return res.sendStatus(404);
  });
});


router.get('/', (req, res) => {
  res.send('Sights endpoint');
});

module.exports = router;
