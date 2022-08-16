const Joi = require('joi');
const productsModel = require('../models/productModel');

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
    'any.required': '400|"productId" is required',
  }),
  quantity: Joi.number().integer().min(1).required()
    .messages({
    'number.min': '422|"quantity" must be greater than or equal to 1',
    'number.empty': '400|"quantity" is required',
    'any.required': '400|"quantity" is required',
  }),
});

const validateSale = (saleObj) => {
  const result = saleSchema.validate(saleObj);
  if ('error' in result) {
    const [code, message] = result.error.details[0].message.split('|');
    return { code, message };
  } 
  return true;
};

const validateProductId = async (productId) => {
  const product = await productsModel.getOne(productId);
  if (!product || product === undefined) {
    return { code: 404, message: 'Product not found' };
  }
  return true;
};

const validateAll = async (saleArray) => Promise.all(
  saleArray.map(async (sale) => {
    const validateOne = validateSale(sale);
    if (validateOne !== true) return validateOne;
    const validateTwo = await validateProductId(sale.productId);
    if (validateTwo !== true) return validateTwo;
  }),
).then((data) => data.find((item) => item));

module.exports = {
  validateName,
  validateSale,
  validateAll,
};
