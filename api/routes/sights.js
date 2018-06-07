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
  const { entrypoint } = req.body;
  let currentSight = '';
  Dataset.create({
    originalName, mimetype, filename, path, size, entrypoint,
  })
    .then(dataset => Sight.create({
      dataset: dataset._id,
      category: req.body.category,
      author: req.user._id,
      name: req.body.name,
    }))
    .then((sight) => {
      currentSight = sight;
      return sight.populate('dataset').execPopulate();
    })
    .then(popSight => popSight.dataset.parse())
    .then((response) => {
      if (response.success) {
        const { data } = response;
        const keys = Object.keys(data);
        const result = data;
        for (let i = 0; i < keys.length; i += 1) {
          const d = keys[i];
          if (!data[d].ignore) {
            const samples = sampleSize(data[d].values, 5);
            const type = detectType(samples);
            result[d] = { samples, type };
          } else {
            result[d] = undefined;
          }
        }

        res.send({ success: true, data: result, currentSight });
      } else {
        res.send({ success: false, err: response.err });
      }
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

router.post('/datatypes', async (req, res) => {
  const { currentSight } = req.body;
  const { fields } = req.body;
  const sight = await Sight.findById(currentSight).exec();
  const dataset = await Dataset.findById(sight.dataset).exec();
  dataset.fields = fields;
  dataset.postAnalysis();
  await dataset.save();
  await sight.generateSimpleGraphs();
  return res.send({ success: true });
});

router.post('/charts/:id', async (req, res) => {
  let sight = await Sight.findById(req.params.id).exec();
  const chartIds = req.body.charts.map(c => c._id);
  sight.charts = chartIds;
  await sight.save();
  sight = await sight.populate('charts').execPopulate();
  return res.send(sight);
});

router.get('/:sightId', async (req, res) => {
  const sight = await Sight.findById(req.params.sightId)
    .populate('charts')
    .populate({ path: 'author', select: 'username -_id' })
    .populate({ path: 'category', select: 'name -_id' })
    .exec();
  if (sight) {
    return res.send(sight);
  }
  return res.sendStatus(404);
});

router.get('/', (req, res) => {
  res.send('Sights endpoint');
});

module.exports = router;
