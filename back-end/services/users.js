const { Joi } = require('frisby');

const { usersModel } = require('../models');

const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().min(6).required();

const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const getUserByEmail = async (email) => usersModel.getUserByEmail(email);

module.exports = {
  loginSchema,
  getUserByEmail,
};
