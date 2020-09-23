const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const Boom = require('boom');

const { usersServices } = require('../services');
const users = require('../models/users');

const { SECRET = "preguicaDeCriarUmSegredo" } = process.env;

const options = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const login = rescue(async (req, res, next) => {
  const { email, password: reqPassword } = req.body || {};

  const { error } = usersServices.loginSchema.validate({ email, password: reqPassword });

  if (error) return next(Boom.unauthorized('email ou senha inválido'));

  const { password, ...user } = await usersServices.getUserByEmail(email) || {};

  if (reqPassword !== password) return next(Boom.unauthorized('email ou senha inválido'));

  try {
    const token = jwt.sign(user, SECRET, options);

    return res.status(200).json({ token });
  } catch (err) {
    return next(Boom.unauthorized('aqui email ou senha invalido'));
  }
});

const getUser = rescue(async (req, res) => {
  const { email } = req.user;

  const { password, ...user } = await usersServices.getUserByEmail(email);

  if (!user) return next(Boom.unauthorized('autenticacao invalida'));
  return res.status(200).json({ ...user });
});

module.exports = {
  login,
  getUser,
};
