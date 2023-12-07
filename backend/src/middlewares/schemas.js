const Joi = require('joi');

const updateProductSchema = Joi.object({
    name: Joi.string().min(5).required().messages({
    'any.required': '"name" is required',
    'min.string': '"name" length must be at least 5 characters long"',
    }),
});

const updatedSaleSchema = Joi.object({
    quantity: Joi.number().integer().min(1).required()
.messages({
    'any.required': '"quantity" is required',
    'min.number': '"quantity" must be larger than or equal to 1',
    }),
});

module.exports = {
    updateProductSchema,
    updatedSaleSchema,
};