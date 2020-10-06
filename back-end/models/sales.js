const connection = require('./connection');
const connectionPlain = require('./connectionPlain');

const addSale = async (
  { userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status },
) => {
  const db = await connection();
  const insertedSale = await db.getTable('sales')
    .insert(['user_id', 'total_price', 'delivery_address', 'delivery_number', 'sale_date', 'status'])
    .values(userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status)
    .execute()
    .then((insertion) => ({
      id: insertion.getAutoIncrementValue(),
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status,
    }));

  return insertedSale;
};

const addToIntermediate = async ({ id, productId, sellingQnt }) => {
  const db = await connection();
  const result = await db.getTable('sales_products')
    .insert(['sale_id', 'product_id', 'quantity'])
    .values(id, productId, sellingQnt)
    .execute()
    .then((insertion) => ({
      id: insertion.getAutoIncrementValue(),
      saleId: id,
      productId,
      sellingQnt,
    }));

  return result;
};

const getAll = async (saleId) => connection()
  .then((db) => db.getTable('sales'))
  .then((table) => table
    .select([
      'id',
      'delivery_number',
      'sale_date',
      'total_price',
      'delivery_address',
      'status',
    ])
    .where('user_id = :id')
    .bind('id', saleId)
    .execute())
  .then((result) => result.fetchAll())
  .then((sales) => sales.map(([id, number, date, total, address, status]) => ({
    id,
    number,
    date,
    total,
    address,
    status,
  })));

const getAllAdmin = async () => connection()
  .then((db) => db.getTable('sales'))
  .then((table) => table
    .select([
      'id',
      'delivery_number',
      'sale_date',
      'total_price',
      'delivery_address',
      'status',
    ])
    .execute())
  .then((result) => result.fetchAll())
  .then((sales) => sales.map(([id, number, date, total, address, status]) => ({
    id,
    number,
    date,
    total,
    address,
    status,
  })));

const getById = async (saleId) => connection()
  .then((db) => db.getTable('sales'))
  .then((table) => table.select().where('id = :id')
    .bind('id', saleId)
    .execute())
  .then((result) => result.fetchAll()[0] || [])
  .then(([id, userId, totalPrice, address, number, date, status]) => (!id
    ? null
    : {
      id,
      userId,
      totalPrice,
      address,
      number,
      date,
      status,
    }));

const getProducts = async (saleId) => connectionPlain()
  .then((session) => session
    .sql(
      `
        SELECT prod.id, prod.name, prod.price, prod.url_image, sp.quantity
        FROM Trybeer.products AS prod
        RIGHT JOIN Trybeer.sales_products AS sp
        ON prod.id = sp.product_id
        WHERE sp.sale_id = ?;
      `,
    )
    .bind(saleId)
    .execute())
  .then((result) => result.fetchAll())
  .then((products) => products.map(([id, name, price, urlImage, quantity]) => ({
    id,
    name,
    price,
    urlImage,
    quantity,
  })));

const updateStatus = async (id, status = 'Entregue') => connection()
  .then((db) => db.getTable('sales'))
  .then((table) => table.update().set('status', status)
    .where('id = :id')
    .bind('id', id)
    .execute());

module.exports = {
  addSale,
  addToIntermediate,
  getAll,
  getById,
  getProducts,
  getAllAdmin,
  updateStatus,
};
