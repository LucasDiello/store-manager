const connection = require('./connection');

const getAll = async () => {
    const [products] = await connection.execute(
        'SELECT * FROM products',
    );
    return products;
};

const findById = async (id) => {
    const [[product]] = await connection.execute(
        'SELECT * FROM products WHERE id = ?',
        [id],
    );
    return product;
};

const createProduct = async (name) => {
    const [{ insertId }] = await connection.execute(
        'INSERT INTO products (name) VALUES (?)',
        [name],
    );

    return {
        id: insertId,
        name,
    };
};

const updateProduct = async (id, name) => {
    await connection.execute(
        'UPDATE products SET name = ? WHERE id = ?',
        [name, id],
    );
    const numbId = Number(id);
    return { id: numbId, name };
};

const deleteProduct = async (id) => {
    await connection.execute(
        'DELETE FROM products WHERE id = ?',
        [id],
    );
};

module.exports = {
    getAll,
    findById,
    createProduct,
    updateProduct,
    deleteProduct,
};