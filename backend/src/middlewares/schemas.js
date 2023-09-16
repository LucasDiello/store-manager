const Joi = require('joi');

const updateProductSchema = Joi.object({
    name: Joi.string().min(5).required().messages({
    'any.required': '"name" is required',
    'min.string': '"name" length must be at least 5 characters long"',
    }),
});

module.exports = {
    updateProductSchema,
};