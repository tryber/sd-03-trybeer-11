const connection = require("./connection");
const connectionPlain = require("./connectionPlain");

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
      table.select().where("id = :id").bind("id", saleId).execute()
    )
    .then((result) => result.fetchAll()[0] || [])
    .then(([id, userId, totalPrice, address, number, date, status]) =>
      !id
        ? null
        : {
            id,
            userId,
            totalPrice,
            address,
            number,
            date,
            status,
          }
    );

const getProducts = async (saleId) =>
  connectionPlain()
    .then((session) =>
      session
        .sql(
          `
        SELECT prod.id, prod.name, prod.price, prod.url_image, sp.quantity
        FROM Trybeer.products AS prod
        RIGHT JOIN Trybeer.sales_products AS sp
        ON prod.id = sp.product_id
        WHERE sp.sale_id = ?;
      `
        )
        .bind(saleId)
        .execute()
    )
    .then((result) => result.fetchAll())
    .then((products) =>
      products.map(([id, name, price, urlImage, quantity]) => ({
        id,
        name,
        price,
        urlImage,
        quantity,
      }))
    );

module.exports = {
  getAll,
  getById,
  getProducts,
};
