const jwt = require('jsonwebtoken');
const Joi = require('joi');

const { SECRET = 'preguicaDeCriarUmSegredo' } = process.env;

const options = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const { usersModel } = require('../models');

const emailSchema = Joi.string().email()
  .required();

const passwordSchema = Joi.string().min(6)
  .required();

const nameSchema = Joi.string().regex(/^[a-zA-Z ]{12}[a-zA-Z ]*$/)
  .min(12)
  .required()
  .error(() => new Error(
    'pelo menos 12 caracteres, não pode conter numeros nem caracteres especiais',
  ));

const roleSchema = Joi.boolean().custom((value) => (value ? 'administrator' : 'client'));

const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const generateToken = (userObj) => {
  try {
    if (userObj.password) return 'Não foi possível gerar a autenticacao';
    const { password, ...user } = userObj;
    const token = jwt.sign(user, SECRET, options);
    return { token };
  } catch (err) {
    return { error: 'Não foi possível gerar a autenticacao' };
  }
};

const userSchema = Joi.object({
  email: emailSchema.error(
    () => new Error('email tem que ser no formato <nome@dominio>'),
  ),
  password: passwordSchema.error(
    () => new Error('senha de pelo menos 6 digitos'),
  ),
  name: nameSchema,
  role: roleSchema,
});

const getUserByEmail = async (email) => usersModel.getUserByEmail(email);

const createUser = async (newUser) => usersModel
  .createUser(newUser)
  .then(({ id, email, name, role }) => ({ id, email, name, role }));

const changeUserName = async (name, { id, email }) => {
  if ((!id && !email) || (id && email)) return { error: 'Erro Interno' };

  const { password, ...user } = id
    ? await usersModel.getUserById(id)
    : await usersModel.getUserByEmail(email);

  if (id) await usersModel.changeUserNameById(id, name);
  if (email) await usersModel.changeUserNameByEmail(email, name);

  return { ...user, name };
};

module.exports = {
  nameSchema,
  loginSchema,
  userSchema,
  getUserByEmail,
  createUser,
  changeUserName,
  generateToken,
};
