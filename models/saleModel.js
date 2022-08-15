const connection = require('./connection');

const createNewSale = async (sales) => {
  const [{ insertId }] = await connection
    .execute(
      'INSERT INTO StoreManager.sales (date) VALUES (NOW());'
    );
  sales.forEach(async ({ productId, quantity }) => {
    await connection.query(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, productId, quantity],
    );
  });
  return { id: insertId, itemsSold: sales };
};

module.exports = {
  createNewSale,
}