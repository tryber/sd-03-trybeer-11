const { Router } = require('express');
const controllers = require('../controllers/index');
const auth = require('../middleware/auth');

const salesRouter = Router();

salesRouter
  .post('/', auth(true), controllers.salesControllers.createSale)

module.exports = salesRouter;
