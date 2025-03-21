const Joi = require("joi");

const newDeckValidation = Joi.object({
  owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  name: Joi.string().required(),
  description: Joi.string().max(255).required()
})

module.exports = {
  newDeckValidation
}
