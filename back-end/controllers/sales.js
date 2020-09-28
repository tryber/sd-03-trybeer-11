const rescue = require('express-rescue');
const { salesServices } = require('../services');

const getAllSales = rescue(async (_req, res, _next) => {
  const sales = await salesServices.getAll();
  res.status(200).json({ sales });
});

module.exports = {
  getAllSales,
};
