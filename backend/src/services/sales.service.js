const { salesModel } = require('../models');
const { validationCreateSale, validationItem,
     validationProducts,
    validationSales } = require('../middlewares/validationsInputsProducts');
const { updatedSaleSchema } = require('../middlewares/schemas');

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
    const errorProduct = await validationItem(sales);
    if (errorProduct) {
 return { status: errorProduct.status,
         data: { message: errorProduct.message } }; 
}
    const sale = await salesModel.createSaleProducts(sales);
    return { status: 'CREATED', data: sale };
};

const deleteSale = async (id) => {
    const errorProduct = await validationItem([{ id: Number(id) }]);
    
    if (errorProduct) {
        const newMessage = errorProduct.message.replace('Product', 'Sale');
        return { status: errorProduct.status,
         data: { message: newMessage } }; 
}
    await salesModel.deleteSale(id);
    return { status: 'NOT_CONTENT', data: { message: 'Sale deleted successfully' } };
};

const updateSale = async (productId, id, quantity) => {
    const { error } = updatedSaleSchema.validate({ quantity });
    if (error) return { status: 'BAD_REQUEST', data: { message: error.message } };
    const errorProduct = await validationItem([{ productId: Number(productId) }]);
    if (errorProduct) {
        const newMessage = `${errorProduct.message} in sale`;

 return { status: errorProduct.status,
         data: { message: newMessage } }; 
}

    const validationSalesError = await validationSales([{ saleId: Number(id) }]);
    if (validationSalesError) {
        const newMessage = `${validationSalesError.message}`;

    return { status: validationSalesError.status,
        data: { message: newMessage } };
}

    const sale = await salesModel.updateSale(productId, id, quantity);
    return { status: 'SUCCESSFUL', data: sale };
};
module.exports = {
    getAll,
    findById,
    createSaleProducts,
    deleteSale,
    updateSale,
};