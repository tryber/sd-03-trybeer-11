const { Router } = require('express');
const rescue = require('express-rescue');
const { salesServices } = require('../services');
const { salesControllers } = require('../controllers');
const { authMiddleware } = require('../middleware');

const salesRouter = Router();

salesRouter
  .get('/', authMiddleware(true), rescue(async (_req, res, _next) => {
    const sales = await salesServices.getAll();
    res.status(200).json({ sales });
  }));

module.exports = salesRouter;
