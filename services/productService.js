const productsModel = require('../models/productModel');

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

module.exports = {
  getAll,
  getOne,
};
