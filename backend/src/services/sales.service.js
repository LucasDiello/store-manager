const { salesModel } = require('../models');
const { validationCreateSale, validationProduct,
     validationProducts } = require('../middlewares/validationsInputsProducts');

const getAll = async () => {
    const sales = await salesModel.getAll();
    return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (id) => {
    const sale = await salesModel.findById(id);
    if (!sale.length) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
    return { status: 'SUCCESSFUL', data: sale };
};

const createSaleProducts = async (sales) => {
    const error = validationCreateSale(sales);
    if (error) return { status: error.status, data: { message: error.message } };
    const errorProducts = validationProducts(sales);
    if (errorProducts) {
 return { status: errorProducts.status,
        data: { message: errorProducts.message } }; 
}
    const errorProduct = await validationProduct(sales);
    if (errorProduct) {
 return { status: errorProduct.status,
         data: { message: errorProduct.message } }; 
}
    const sale = await salesModel.createSaleProducts(sales);
    return { status: 'CREATED', data: sale };
};

module.exports = {
    getAll,
    findById,
    createSaleProducts,
};