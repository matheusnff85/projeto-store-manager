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
  return (result.length !== 0);
};

const getAll = async () => {
  const query = `SELECT spd.sale_id AS saleId, sale.date, spd.product_id AS productId, spd.quantity
  FROM StoreManager.sales_products AS spd
  INNER JOIN StoreManager.sales AS sale
  WHERE spd.sale_id = sale.id
  ORDER BY sale.id ASC, spd.product_id ASC;`;

  const [result] = await connection.execute(query);
  return result;
};

const getOne = async (id) => {
  const query = `SELECT sale.date, spdt.product_id AS productId, spdt.quantity
  FROM StoreManager.sales_products AS spdt
  INNER JOIN StoreManager.sales AS sale
  WHERE spdt.sale_id = sale.id AND sale.id = ?
  ORDER BY sale.id ASC, spdt.product_id ASC;`;

  const [result] = await connection.execute(query, [id]);
  return result;
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;',
    [id],
  );
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?;',
    [id],
  );
  return true;
};

const updateSale = async (saleId, productId, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE product_id = ? AND sale_id = ?;',
    [quantity, productId, saleId],
  );
  return true;
};

module.exports = {
  createNewSale,
  createSaleId,
  verifySaleId,
  getAll,
  getOne,
  deleteSale,
  updateSale,
};
