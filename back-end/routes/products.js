const { Router } = require('express');
const { productsControllers } = require('../controllers');

const products = Router();

products
  .get('/', productsControllers.getAll)

module.exports = products;
