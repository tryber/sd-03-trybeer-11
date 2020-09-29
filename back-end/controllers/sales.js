const rescue = require("express-rescue");
const { salesServices } = require("../services");
const Boom = require("boom");

const getAllSales = rescue(async (_req, res, _next) => {
  const sales = await salesServices.getAll();
  res.status(200).json({ sales });
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

  if (req.user.id !== sale.userId) {
    return next(Boom.unauthorized("Você nao tem permissão para ver essa compra"));
  }

  return res.status(200).json({ ...sale, products });
});

module.exports = {
  getAllSales,
  getSaleDetails,
};
