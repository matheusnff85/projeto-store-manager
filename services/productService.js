const productsModel = require('../models/productModel');
const validations = require('./validations');

const productNotFound = { code: 404, message: 'Product not found' };

const getAll = async () => {
  const result = await productsModel.getAll();
  if (!result) return productNotFound;
  return { data: result, code: 200 };
};

const getOne = async (id) => {
  const result = await productsModel.getOne(id);
  if (!result) return productNotFound;
  return { data: result, code: 200 };
};

const createProduct = async (productName) => {
  const validate = validations.validateName(productName);
  if (validate !== true) {
    return { code: validate.code, message: validate.message };
  }
  const result = await productsModel.createProduct(productName);
  return { data: result, code: 201 };
};

const updateProduct = async (id, newName) => {
  const validateId = await validations.validateProductId(id);
  if (validateId !== true) return validateId;
  const validateName = await validations.validateName(newName);
  if (validateName !== true) return validateName;
  
  const result = await productsModel.updateProduct(id, newName);
  return { data: result, code: 200 };
};

module.exports = {
  getAll,
  getOne,
  createProduct,
  updateProduct,
};
