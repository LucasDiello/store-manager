const { productsModel } = require('../models');

const validationCreateProduct = (name) => {
    if (!name) return { status: 'BAD_REQUEST', message: '"name" is required' };
    const MIN_NAME_LENGTH = 5;
    if (name.length <= MIN_NAME_LENGTH) {
 return { status: 'UNPROCESSABLE_ENTITY',
      message: '"name" length must be at least 5 characters long' }; 
}
};

const validationItem = async (itemsId) => {
    const products = await productsModel.getAll();
    
    const verify = (
        itemsId.map((sale) => products.some((product) => product.id === sale.productId
         || product.id === sale.id)));
    if (verify.includes(false)) return { status: 'NOT_FOUND', message: 'Product not found' };
};

const validationProducts = (sales) => {
    const invalidSale = sales.find((sale) => {
        const { quantity, productId } = sale;
        return !quantity || !productId;
    });

    if (invalidSale) {
        const missingField = !invalidSale.quantity ? 'quantity' : 'productId';
        return { status: 'BAD_REQUEST', message: `"${missingField}" is required` };
    }
    
    return null;
};

const validationCreateSale = (sales) => {
    const invalidSale = sales.find((sale) => sale.quantity <= 0);

    if (invalidSale) {
        return { status: 'UNPROCESSABLE_ENTITY',
         message: '"quantity" must be greater than or equal to 1' };
    }
    return null;
};

module.exports = {
    validationCreateProduct,
    validationCreateSale,
    validationItem,
    validationProducts,
};