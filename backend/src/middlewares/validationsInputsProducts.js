const validationCreateProduct = (name) => {
    if (!name) return { status: 'BAD_REQUEST', message: '"name" is required' };
    const MIN_NAME_LENGTH = 5;
    if (name.length <= MIN_NAME_LENGTH) {
 return { status: 'UNPROCESSABLE_ENTITY',
      message: '"name" length must be at least 5 characters long' }; 
}
};

module.exports = {
    validationCreateProduct,
};