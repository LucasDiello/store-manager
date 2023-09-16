const { productsModel } = require('../models');
const { validationCreateProduct,
     validationProduct } = require('../middlewares/validationsInputsProducts');
const { updateProductSchema } = require('../middlewares/schemas'); 

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

const updateProduct = async (id, name) => {
    const { error } = updateProductSchema.validate({ name });
    const errorProduct = await validationProduct([{ productId: Number(id) }]);  
    if (errorProduct) {
 return {
         status: errorProduct.status, data: { message: errorProduct.message } }; 
}
    if (error) {
        const HTTPSTATUS = error.message === '"name" is required'
        ? 'BAD_REQUEST'
        : 'UNPROCESSABLE_ENTITY';
 return { status: HTTPSTATUS, data: { message: error.message } }; 
}

    const product = await productsModel.updateProduct(id, name);
    if (!product) return { status: 'BAD_REQUEST', data: { message: 'Product not found' } };
    return { status: 'SUCCESSFUL', data: product };
};

const deleteProduct = async (id) => {
    const errorProduct = await validationProduct([{ productId: Number(id) }]);
    if (errorProduct) {
        return {
                status: errorProduct.status, data: { message: errorProduct.message } }; 
       }
     await productsModel.deleteProduct(id);
    return { status: 'NOT_CONTENT' };
};

module.exports = {
    getAll,
    findById,
    createProduct,
    updateProduct,
    deleteProduct,
};
