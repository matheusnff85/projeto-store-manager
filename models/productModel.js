const connection = require('./connection');

const getAll = async () => {
  const result = await connection
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
  return result;
};

module.exports = {
  getAll,
  getOne,
};