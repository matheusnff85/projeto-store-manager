const salesModel = require('../models/saleModel');
const validations = require('./validations');

const createNewSale = async (saleArray) => {
  const validateResult = await validations.validateAll(saleArray);
  if (validateResult !== undefined) return validateResult;

  const saleId = await salesModel.createSaleId();
  await Promise.all(saleArray.map((sale) => (
    salesModel.createNewSale(saleId, sale)
  )));
  return { data: { id: saleId, itemsSold: saleArray }, code: 201 };
};

const getAll = async () => {
  const result = await salesModel.getAll();
  if (!result || result.length === 0) return { code: 404, message: 'Sale not found' };
  return { data: result, code: 200 };
};

const getOne = async (id) => {
  const validateId = await validations.validateSaleId(id);
  if (validateId !== true) return validateId;

  const result = await salesModel.getOne(id);
  return { data: result, code: 200 };
};

const deleteSale = async (id) => {
  const validateId = await validations.validateSaleId(id);
  if (validateId !== true) return validateId;

  await salesModel.deleteSale(id);
  return { code: 204 };
};

const updateSale = async (id, updatesArray) => {
  const validateItems = await validations.validateAll(updatesArray);
  if (validateItems !== undefined) return validateItems;
  const validateSale = await validations.validateSaleId(id);
  if (validateSale !== true) return validateSale;

  await Promise.all(updatesArray.map((sale) =>
    salesModel.updateSale(id, sale.productId, sale.quantity)));
  return { data: { saleId: id, itemsUpdated: updatesArray }, code: 200 };
};

module.exports = {
  createNewSale,
  getAll,
  getOne,
  deleteSale,
  updateSale,
};
