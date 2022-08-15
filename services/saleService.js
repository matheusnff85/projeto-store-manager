const salesModel = require('../models/saleModel');
const validations = require('./validations');
const productsModel = require('../models/productModel');

const validateProducts = async (saleArray) => {
  const productIsOnDB = await Promise.all(saleArray.map((sale) => (
    productsModel.getOne(sale.productId)
  )));
  if (productIsOnDB.includes(undefined)) return { code: 404, message: 'Product not found' };
  return true;
};

const createNewSale = async (saleArray) => {
  const productsIsValid = await validateProducts(saleArray);
  if (productsIsValid !== true) return productsIsValid;
  const salesIsValid = validations.validateSale(saleArray);
  if (salesIsValid !== true) return salesIsValid;
  
  const saleId = await salesModel.createSaleId();
  Promise.all(saleArray.map(async (sale) => {
    await salesModel.createNewSale(saleId, sale);
  }));
  return { data: { id: saleId, itemsSold: saleArray }, code: 201 };
};

module.exports = {
  createNewSale,
};
