const connection = require('./connection');

const createSaleId = async () => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (NOW());');
  return insertId;
};

const createNewSale = async (saleId, { productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [saleId, productId, quantity],
  );
  return true;
};

module.exports = {
  createNewSale,
  createSaleId,
};
