const Joi = require('@hapi/joi');
const { salesModel } = require('../models');

const idSchema = Joi.number()
  .integer()
  .positive()
  .required()
  .error(() => new Error('user id inválido'));

const totalPriceSchema = Joi.number()
  .positive()
  .required()
  .error(() => new Error('preço total inválido'));

const deliveryAddressSchema = Joi.string()
  .required()
  .error(() => new Error('endereço necessário'));

const saleDateSchema = Joi.date()
  .required()
  .error(() => new Error('data inválida'));

const productObjSchema = Joi.object()
  .keys({
    id: Joi.number()
      .integer()
      .positive()
      .required()
      .error(() => new Error('product id inválido')),
    sellingQnt: Joi.number()
      .integer()
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
  const intermediateInfo = await salesModel.addToIntermediate(
    saleIntermediateInfo,
  );
  return intermediateInfo;
};

const getAll = async (id) => (id
  ? salesModel.getAll(id)
  : salesModel.getAllAdmin());

const getById = async (id) => salesModel
  .getById(id)
  .then((sale) => sale
      || { error: true, message: 'Compra não encontrada' });

const getProducts = async (id) => salesModel.getProducts(id);

const deliverySale = async (id, status) => salesModel.updateStatus(id, status);

const confirmOwnerShip = async (userRequestId, saleId) => {
  const { userId } = await salesModel.getById(saleId);
  if (userRequestId !== userId) return { error: true, message: 'Essa compra não é sua' };
  return { ok: true };
};

module.exports = {
  idSchema,
  checkoutSchema,
  addSale,
  addToIntermediate,
  getAll,
  getById,
  getProducts,
  deliverySale,
  confirmOwnerShip,
};
