const rescue = require('express-rescue');
const Boom = require('boom');

const { usersServices } = require('../services');

const login = rescue(async (req, res, next) => {
  const { email, password: reqPassword } = req.body || {};

  const { error } = usersServices.loginSchema.validate({ email, password: reqPassword });

  if (error) return next(Boom.unauthorized('email ou senha inválido'));

  const { password, ...user } = await usersServices.getUserByEmail(email) || {};

  if (reqPassword !== password) return next(Boom.unauthorized('email ou senha inválido'));

  try {
    const { token, error: errorToken } = usersServices.generateToken(user);

    if (errorToken) return next(Boom.unauthorized(error));

    return res.status(200).json({ token, ...user });
  } catch (err) {
    return next(Boom.unauthorized('aqui email ou senha invalido'));
  }
});

const getUser = rescue(async (req, res, next) => {
  const { email } = req.user;

  const { password, ...user } = await usersServices.getUserByEmail(email);

  if (!user) return next(Boom.unauthorized('autenticacao invalida'));
  return res.status(200).json({ ...user });
});

const validate = (req, _res, next) => {
  const { email, name, password, role } = req.body;

  if (!email || !name || !password) return next(Boom.badData('Faltando informacoes'));

  const { error, value } = usersServices.userSchema.validate({ email, name, password, role });

  if (error) return next(Boom.badData(error));

  req.validated = value;
  return next();
};

const register = rescue(async (req, res, next) => {
  const { email, password, role, name } = req.validated;

  const { id } = await usersServices.getUserByEmail(email);

  if (id) return next(Boom.conflict('E-mail already in database.'));

  const newUser = await usersServices.createUser({ email, name, password, role });

  const { token, error } = usersServices.generateToken(newUser);

  if (error) return next(Boom.unauthorized(error));

  return res.status(201).json({ ...newUser, token });
});

const changeUser = rescue(async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.user;

  const { error } = usersServices.nameSchema.validate(name);

  if (error) return next(Boom.badData(error));
  const changedUser = await usersServices.changeUserName(name, { id });

  if (changeUser.error) return next(Boom.internal(error));

  return res.status(200).json({ ...changedUser });
});

module.exports = {
  login,
  getUser,
  validate,
  register,
  changeUser,
};
