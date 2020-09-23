const fs = require('fs');
const path = require('path');
const multer = require('multer');
const express = require('express');
const { productsControllers } = require('../controllers');
const products = express.Router();

products.use('/images', express.static(path.join(__dirname, '../images')));

products
  .get('/', productsControllers.getAll)

module.exports = products;
