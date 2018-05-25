const Joi = require('joi');

module.exports = {
  body: {
    name: Joi.string().min(2).required(),
  },
};
