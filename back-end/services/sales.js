const { salesModel } = require('../models');

const getAll = async () => salesModel.getAll();

const getById = async (id) => salesModel.getById(id)
  .then((sale) => sale || { error: true, message: 'Compra não encontrada' } );

module.exports = {
  getAll,
  getById,
};
