const { salesModel } = require('../models');

const getAll = async () => {
    const sales = await salesModel.getAll();
    return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (id) => {
    const sale = await salesModel.findById(id);
    if (!sale.length) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
    return { status: 'SUCCESSFUL', data: sale };
};

module.exports = {
    getAll,
    findById,
};