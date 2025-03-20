const Joi = require("joi");

const newUserValidation = Joi.object({
  firstName: Joi.string().alphanum().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { alow: ['com, net'] } }),
})

const updateUserValidation = Joi.object({
  userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  userData: Joi.object({
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().required(),
  })
})

const newUserDeckValidation = Joi.object({
  userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  name: Joi.string().required(),
  description: Joi.string().max(155).required(),
})

const userIdValidation = Joi.object({
  userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
})

module.exports = {
  newUserValidation,
  updateUserValidation,
  newUserDeckValidation,
  userIdValidation
}
