const Joi = require('joi')

const userValidation = Joi.object({
    accountBalance: Joi.number().optional(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    birthday: Joi.date().required()
})
const depositValidation = Joi.object({
    depositAmount: Joi.number().required(),
    id: Joi.string().required()
})
const withdrawalValidation = Joi.object({
    withdrawalAmount: Joi.number().required(),
    id: Joi.string().required()
})
module.exports = {
    userValidation,
    withdrawalValidation,
    depositValidation
}
