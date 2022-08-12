const productsService = require('../services/productService');

const getAll = async (_req, res) => {
  const result = await productsService.getAll();
  if ('message' in result) {
    return res.status(result.code).json({ message: result.message });
  }
  return res.status(result.code).send(result.data);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getOne(id);
  if ('message' in result) {
    return res.status(result.code).json({ message: result.message });
  }
  return res.status(result.code).send(result.data);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const result = await productsService.createProduct(name);
  if ('message' in result) {
    return res.status(result.code).json({ message: result.message });
  }
  return res.status(result.code).send(result.data);
}


module.exports = {
  getAll,
  getOne,
  createProduct,
};
