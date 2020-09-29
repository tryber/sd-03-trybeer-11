const Boom = require('boom');
const rescue = require('express-rescue');
const { salesServices } = require('../services/index');

const date = new Date();

const createSale = rescue(async (req, res, next) => {
  const { totalPrice, deliveryAddress, deliveryNumber, products } = req.body;

  const saleDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}
    ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const { id: userId } = req.user;

  const { error } = salesServices.checkoutSchema.validate({
    userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, products,
  });

  if (error) return next(Boom.badData(error));

  const { id } = await salesServices.addSale({
    userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status: false,
  });

  await Promise.all(
    products.map(async ({ id: productId, sellingQnt }) => {
      await salesServices.addToIntermediate({ id, productId, sellingQnt });
    }),
  );

  return res.status(201).json({ message: 'Venda processada!' });
});

module.exports = {
  createSale,
};
