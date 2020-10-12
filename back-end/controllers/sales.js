const Boom = require('boom');
const rescue = require('express-rescue');
const { salesServices } = require('../services');

const createSale = rescue(async (req, res, next) => {
  const date = new Date();
  const { totalPrice, deliveryAddress, deliveryNumber, products } = req.body;

  const saleDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}
    ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const { id: userId } = req.user;

  const { error } = salesServices.checkoutSchema.validate({
    userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, products,
  });

  if (error) return next(Boom.badData(error));

  const { id } = await salesServices.addSale({
    userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status: 'Pendente',
  });

  await Promise.all(
    products.map(async ({ id: productId, sellingQnt }) => {
      await salesServices.addToIntermediate({ id, productId, sellingQnt });
    }),
  );

  return res.status(201).json({ message: 'Venda processada!' });
});

const getAllSales = rescue(async (req, res, _next) => {
  const id = (req.user.role === 'administrator' ? undefined : req.user.id);
  const sales = await salesServices.getAll(id);
  return res.status(200).json({ sales });
});

const getSaleDetails = rescue(async (req, res, next) => {
  const { id } = req.params;

  const { error } = salesServices.idSchema.validate(id);

  if (error) return next(Boom.badRequest(error.message));

  const [sale, products] = await Promise.all([
    salesServices.getById(id),
    salesServices.getProducts(id),
  ]);

  if (sale.error) return next(Boom.notFound(sale.message));

  if (req.user.role !== 'administrator' && req.user.id !== sale.userId) {
    return next(Boom.unauthorized('Você nao tem permissão para ver essa compra'));
  }

  return res.status(200).json({ ...sale, products });
});

const updateSale = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const { id: userId } = req.user;

  const { error } = salesServices.confirmOwnerShip(userId, id);

  if (error) return next(Boom.unauthorized(error.message));

  await salesServices.deliverySale(id, status);

  return res.status(200).json({ message: 'Entregue!' });
});

module.exports = {
  createSale,
  getAllSales,
  getSaleDetails,
  updateSale,
};
