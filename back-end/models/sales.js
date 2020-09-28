const connection = require('./connection');

const getAll = async () => connection()
  .then((db) => db.getTable('sales'))
  .then((table) => table.select(['delivery_number', 'sale_date', 'total_price']).execute())
  .then((result) => result.fetchAll())
  .then((sales) => sales.map(([id, date, value]) => ({ id, date, value })));

module.exports = {
  getAll,
};
