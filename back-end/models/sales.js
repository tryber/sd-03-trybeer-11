const connection = require('./connection');

const addSale = async ({ userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status }) => {
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
}

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
}

module.exports = {
  addSale,
  addToIntermediate,
};
