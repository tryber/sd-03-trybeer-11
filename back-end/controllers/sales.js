const rescue = require('express-rescue');
const { salesServices } = require('../services');

const getAllSales = rescue(async (_req, res, _next) => {
  console.log('chegou aqui');
  const sales = await salesServices.getAll();
  console.log('sales');
  res.status(200).json({ sales });
});

module.exports = {
  getAllSales,
};
