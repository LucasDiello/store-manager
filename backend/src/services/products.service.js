const { productsModel } = require('../models');
const { validationCreateProduct } = require('../middlewares/validationsInputsProducts');

const getAll = async () => {
    const products = await productsModel.getAll();
    return { status: 'SUCCESSFUL', data: products };
};

const findById = async (id) => {
    const product = await productsModel.findById(id);
    if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    return { status: 'SUCCESSFUL', data: product };
};

const createProduct = async (name) => {
    const error = validationCreateProduct(name);
    if (error) {
         return { status: error.status,
         data: { message: error.message } }; 
}
    const product = await productsModel.createProduct(name);
    if (!product) return { status: 'ERROR', data: { message: 'Product already exists' } };
    return { status: 'CREATED', data: product };
};

module.exports = {
    getAll,
    findById,
    createProduct,
};
