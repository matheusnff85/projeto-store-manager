const salesService = require('../services/saleService');

const createNewSale = async (req, res) => {
  const result = await salesService.createNewSale(req.body);
  if ('message' in result) {
    return res.status(Number(result.code)).json({ message: result.message });
  }
  return res.status(result.code).send(result.data);
};

module.exports = {
  createNewSale,
};
