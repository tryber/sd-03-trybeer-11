const { Router } = require('express');

const { salesControllers } = require('../controllers');
const { authMiddleware } = require('../middleware');

const salesRouter = Router();

salesRouter
  .get('/', authMiddleware(true), salesControllers.getAllSales)
  .get('/orders/:id', authMiddleware(true), salesControllers.getSale);

module.exports = salesRouter;
