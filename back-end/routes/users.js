const { Router } = require('express');

const { usersControllers } = require('../controllers');
const { authMiddleware } = require('../middleware');

const usersRouter = Router();

usersRouter
  .post('/login', usersControllers.login)
  .post('/', usersControllers.validate, usersControllers.register)
  .get('/', authMiddleware(true), usersControllers.getUser)
  .put('/profile', authMiddleware(true), usersControllers.changeUser);

module.exports = usersRouter;
