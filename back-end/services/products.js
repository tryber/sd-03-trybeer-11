const { productsModel } = require('../models');

const getAll = async () => productsModel.getAll();

module.exports = {
  getAll,
};
