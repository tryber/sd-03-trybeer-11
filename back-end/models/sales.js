const connection = require("./connection");

const getAll = async () =>
  connection()
    .then((db) => db.getTable("sales"))
    .then((table) =>
      table
        .select([
          "id",
          "delivery_number",
          "sale_date",
          "total_price",
          "delivery_address",
          "status",
        ])
        .execute()
    )
    .then((result) => result.fetchAll())
    .then((sales) =>
      sales.map(([id, number, date, total, address, status]) => ({
        id,
        number,
        date,
        total,
        address,
        status,
      }))
    );

module.exports = {
  getAll,
};
