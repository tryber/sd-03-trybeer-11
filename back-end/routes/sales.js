const { Router } = require('express');
const { salesControllers } = require('../controllers');
const { authMiddleware } = require('../middleware');

const salesRouter = Router();

salesRouter
  .get('/:id', authMiddleware(true), salesControllers.getSaleDetails)
  .post('/', authMiddleware(true), salesControllers.createSale)
  .get('/', authMiddleware(true), salesControllers.getAllSales)
  .put('/:id', authMiddleware(true), salesControllers.updateSale);

module.exports = salesRouter;
