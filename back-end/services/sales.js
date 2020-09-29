const Joi = require('@hapi/joi');
const { salesModel } = require('../models/index');

const idSchema = Joi.number().integer()
  .positive()
  .required()
  .error(() => new Error('user id inválido'));

const totalPriceSchema = Joi.number().positive()
  .required()
  .error(() => new Error('preço total inválido'));

const deliveryAddressSchema = Joi.string().required()
  .error(() => new Error('endereço necessário'));

const saleDateSchema = Joi.date().required()
  .error(() => new Error('data inválida'));

const productObjSchema = Joi.object().keys({
  id: Joi.number().integer()
    .positive()
    .required()
    .error(() => new Error('product id inválido')),
  sellingQnt: Joi.number().integer()
    .positive()
    .required()
    .error(() => new Error('quantidade inválida')),
})
  .unknown(true);

const productsSchema = Joi.array().min(1)
  .items(productObjSchema);

const checkoutSchema = Joi.object({
  userId: idSchema,
  totalPrice: totalPriceSchema,
  deliveryAddress: deliveryAddressSchema,
  deliveryNumber: deliveryAddressSchema,
  saleDate: saleDateSchema,
  products: productsSchema,
});

const addSale = async (saleObj) => {
  const sale = await salesModel.addSale(saleObj);
  return sale;
};

const addToIntermediate = async (saleIntermediateInfo) => {
  const intermediateInfo = await salesModel.addToIntermediate(saleIntermediateInfo);
  return intermediateInfo;
};

module.exports = {
  checkoutSchema,
  addSale,
  addToIntermediate,
};
