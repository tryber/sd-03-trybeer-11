const jwt = require('jsonwebtoken');
const Boom = require('boom');
const rescue = require('express-rescue');

const { usersServices } = require('../services');

const { SECRET = 'preguicaDeCriarUmSegredo' } = process.env;

module.exports = (isNecessary = true) => rescue(async (req, _res, next) => {
  const { authorization: token } = req.headers;

  try {
    const user = jwt.verify(token, SECRET);

    const DBUser = await usersServices.getUserByEmail(user.email);

    if (!DBUser && isNecessary) {
      return next(Boom.unauthorized('email ou senha inválido'));
    }

    req.user = DBUser;
    return next();
  } catch (err) {
    return next(Boom.unauthorized('autenticacao invalido'));
  }
});
