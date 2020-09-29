const { Router } = require('express');
const { productsControllers } = require('../controllers');
const { authMiddleware } = require('../middleware');

const products = Router();

products
  .get('/', authMiddleware(true), productsControllers.getAll);

module.exports = products;
