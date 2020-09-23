const path = require('path');
const express = require('express');
const { productsControllers } = require('../controllers');

const products = express.Router();

products.use(
  '/images',
  express.static(path.join(__dirname, '../images'), { extensions: ['png', 'jpg'] }),
);

products
  .get('/', productsControllers.getAll);

module.exports = products;
