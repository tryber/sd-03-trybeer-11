const Joi = require('joi');

const { usersModel } = require("../models");

const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().min(6).required();
const nameSchema = Joi.string().regex(/^[a-zA-Z]*$/)
  .min(12)
  .required();
const roleSchema = Joi.string().custom((value) => value ? 'administrador' : 'client');

const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const userSchema = Joi.object({
  email: emailSchema.error(
    () => new Error("email tem que ser no formato <nome@dominio>")
  ),
  password: passwordSchema.error(
    () => new Error("senha de pelo menos 6 digitos")
  ),
  name: nameSchema.error(
    () =>
      new Error(
        "pelo menos 12 caracteres, não pode conter numeros nem caracteres especiais"
      )
  ),
  role: roleSchema,
});

const getUserByEmail = async (email) => usersModel.getUserByEmail(email);

const createUser = async ({ email, name, password, role = "client" }) =>
  usersModel.createUser({ email, name, password, role })
  .then(({ id, email, name, role }) => ({ id, email, name, role }));

module.exports = {
  loginSchema,
  userSchema,
  getUserByEmail,
  createUser,
};
