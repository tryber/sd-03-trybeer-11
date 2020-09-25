const connection = require('./connection');

const getAll = async () => connection()
  .then((db) => db.getTable('products'))
  .then((table) => table.select().execute())
  .then((response) => response.fetchAll())
  .then((products) => products.map(([id, name, price, urlImage]) => ({
    id,
    name,
    price,
    urlImage,
  })));

module.exports = {
  getAll,
};
