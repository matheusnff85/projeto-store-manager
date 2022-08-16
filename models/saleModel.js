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

const verifySaleId = async (id) => {
  const [result] = await connection.execute(
    'SELECT id FROM StoreManager.sales WHERE id = ?;', [id],
  );
  return result;
};

const getAll = async () => {
  const query = `SELECT spdt.sale_id, sale.date, spdt.product_id, spdt.quantity
  FROM StoreManager.sales_products AS spdt
  INNER JOIN StoreManager.sales AS sale
  WHERE spdt.sale_id = sale.id
  ORDER BY sale.id ASC, spdt.product_id ASC;`;

  const [result] = await connection.execute(query);
  return result;
};

const getOne = async (id) => {
  const query = `SELECT spdt.sale_id, sale.date, spdt.product_id, spdt.quantity
  FROM StoreManager.sales_products AS spdt
  INNER JOIN StoreManager.sales AS sale
  WHERE spdt.sale_id = sale.id AND sale.id = ?
  ORDER BY sale.id ASC, spdt.product_id ASC;`;

  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  createNewSale,
  createSaleId,
  verifySaleId,
  getAll,
  getOne,
};
