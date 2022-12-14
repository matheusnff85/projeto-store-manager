const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection
    .execute(
      'SELECT * FROM StoreManager.products;',
  );
  return result;
};

const getOne = async (id) => {
  const [result] = await connection
    .execute(
      'SELECT * FROM StoreManager.products WHERE id = ?;',
      [id],
  );
  return result[0];
};

const createProduct = async (name) => {
  const [result] = await connection
    .execute(
      'INSERT INTO StoreManager.products (name) VALUES (?);',
      [name],
  );
  return { id: result.insertId, name };
};

const updateProduct = async (id, name) => {
  await connection
    .execute('UPDATE StoreManager.products SET name = ? WHERE id = ?;', [name, id]);
  return { id, name };
};

const deleteProduct = async (id) => {
  await connection
    .execute('DELETE FROM StoreManager.products WHERE id = ?;', [id]);
  return true;
};

const getByName = async (productName) => {
  const [result] = await connection
    .execute(
      'SELECT * FROM StoreManager.products WHERE name LIKE ?;',
      [`%${productName}%`],
  );
  return result;
};

module.exports = {
  getAll,
  getOne,
  createProduct,
  updateProduct,
  deleteProduct,
  getByName,
};