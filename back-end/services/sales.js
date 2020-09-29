const Joi = require("joi");
const { salesModel } = require("../models");

const idSchema = Joi.number().required().error(() => new Error("id not valid"));

const getAll = async () => salesModel.getAll();

const getById = async (id) =>
  salesModel
    .getById(id)
    .then((sale) => sale || { error: true, message: "Compra não encontrada" });

const getProducts = async (id) => salesModel.getProducts(id);

module.exports = {
  idSchema,
  getAll,
  getById,
  getProducts,
};
