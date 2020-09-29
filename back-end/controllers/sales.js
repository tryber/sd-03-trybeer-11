const Boom = require('boom');
const rescue = require('express-rescue');
const { salesServices } = require('../services/index');


const createSale = rescue(async(req, res, next) => {
  console.log('1')
  const { userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, products } = req.body;
  const { error } = salesServices.checkoutSchema.validate({
    userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, products
  });
  console.log(error)

  if (error) return next(Boom.badData(error));
  console.log(saleDate)

  const { id } = await salesServices.addSale({
    userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status: false,
  })
  console.log('4')

  await Promise.all(
    products.map(async ({ id: productId, sellingQnt }) => {
      await salesServices.addToIntermediate({ id, productId, sellingQnt })
    })
  )
  console.log('5')

  return res.status(201).json({ message: 'Venda processada!' })
});

module.exports = {
  createSale,
};
