const Joi = require('joi');

module.exports = {
  body: {
    name: Joi.string().min(5).required(),
  },
};
