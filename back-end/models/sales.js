const connection = require("./connection");

const getAll = async () =>
  connection()
    .then((db) => db.getTable("sales"))
    .then((table) =>
      table
        .select(["id", "delivery_number", "sale_date", "total_price"])
        .execute()
    )
    .then((result) => result.fetchAll())
    .then((sales) =>
      sales.map(([id, number, date, value]) => ({ id, number, date, value }))
    );

const getById = async (saleId) =>
  connection()
    .then((db) => db.getTable("sales"))
    .then((table) =>
      table
        .select(["id", "delivery_number", "sale_date", "total_price"])
        .where('id = :id')
        .bind('id', saleId)
        .execute()
    )
    .then((result) => result.fetchAll()[0] || [])
    .then(([id, userId, totalPrice, address, number, date, status]) => !id ? null : {
      id,
      userId,
      totalPrice,
      address,
      number,
      date,
      status,
    });

module.exports = {
  getAll,
  getById,
};
