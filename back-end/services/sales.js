const { salesModel} = require('../models');

const getAll = async () => salesModel.getAll();

module.exports = {
  getAll,
};

