const { productsModel } = require('../models');

const getAll = async () => {
    const products = await productsModel.getAll();
    return { status: 'SUCCESSFUL', data: products };
};

const findById = async (id) => {
    const product = await productsModel.findById(id);
    if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
    getAll,
    findById,
};