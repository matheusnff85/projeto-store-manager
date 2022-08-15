const Joi = require('joi');

const nameSchema = Joi.string().min(5).required().messages({
  'string.min': '422|"name" length must be at least 5 characters long',
  'string.empty': '400|"name" is required',
  'any.required': '400|"name" is required',
});

const validateName = (string) => {
  const result = nameSchema.validate(string);
  if ('error' in result) {
    const [code, message] = result.error.details[0].message.split('|');
    return { code, message };
  }
  return true;
};

const saleSchema = Joi.object({
  productId: Joi.number().required().messages({
    'any.required': '400|"product" is required',
  }),
  quantity: Joi.number().integer().min(1).required()
    .messages({
    'number.min': '422|"quantity" must be greater than or equal to 1',
    'number.empty': '400|"quantity" is required',
    'any.required': '400|"quantity" is required',
  }),
});

const validateSale = (saleArray) => {
  const validateResult = saleArray.map((sale) => {
    const result = saleSchema.validate(sale);
    if ('error' in result) {
      const [code, message] = result.error.details[0].message.split('|');
      return { code, message };
    } return true;
  });
  return validateResult.find((validate) => typeof validate === 'object') || true;
};

module.exports = {
  validateName,
  validateSale,
};
