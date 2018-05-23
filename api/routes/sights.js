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


module.exports = router;
