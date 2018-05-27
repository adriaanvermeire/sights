/* eslint-disable no-shadow */
const { auth } = require('./middleware');
const { detectType } = require('../utils');

const express = require('express');
const validate = require('express-validation');
const validation = require('./validation');
const multer = require('multer');
const sampleSize = require('lodash.samplesize');

const router = express.Router();
const dest = `${process.env.UPLOADS}/` || 'uploads/';
const upload = multer({ dest });

const Dataset = require('../models/dataset');
const Sight = require('../models/sight');

const datatypes = require('../config/datatypes');

const routeMiddlewareNew = [
  auth,
  upload.single('dataset'),
  validate(validation.sight),
];
router.post('/new', routeMiddlewareNew, (req, res) => {
  // req.file is the `dataset` file
  // req.body will hold the text fields, if there were any
  const {
    originalname: originalName, mimetype, filename, path, size,
  } = req.file;
  let currentSight = '';
  Dataset.create({
    originalName, mimetype, filename, path, size,
  })
    .then(dataset => Sight.create({
      dataset: dataset._id,
      category: req.body.category,
      author: req.user._id,
      name: req.body.name,
    }))
    .then((sight) => {
      currentSight = sight._id;
      return sight.populate('dataset').execPopulate();
    })
    .then(popSight => popSight.dataset.parse())
    .then((data) => {
      const keys = Object.keys(data);
      const result = data;
      for (let i = 0; i < keys.length; i += 1) {
        const d = keys[i];
        const samples = sampleSize(data[d], 5);
        const type = detectType(samples);
        result[d] = { samples, type };
      }

      res.send({ success: true, data: result, currentSight });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({ success: false, err });
    });
});

router.get('/explore', (req, res) => {
  Sight.featured()
    .then(sights => res.send({ sights }))
    .catch(e => res.status(404).send({ success: false, err: e }));
});

router.get('/datatypes', (req, res) => res.send({ datatypes }));

router.post('/datatypes', (req, res) => {
  const { currentSight, fields } = req.body;
  Sight.findById(currentSight).exec()
    .then(sight => sight.populate('dataset').execPopulate())
    .then((popSight) => {
      const sight = popSight;
      sight.dataset.fields = fields;
      return sight.dataset.save();
    })
    .then(sight => res.send({ success: true, sight }))
    .catch(e => console.log(e));
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
