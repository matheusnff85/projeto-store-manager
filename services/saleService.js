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

module.exports = {
  createNewSale,
};
