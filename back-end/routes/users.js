const { Router } = require('express');

const { usersControllers } = require('../controllers');
const { authMiddleware } = require('../middleware');

const usersRouter = Router();

usersRouter
  .post('/login', usersControllers.login)
  .get('/', authMiddleware(true), usersControllers.getUser);

module.exports = usersRouter;
