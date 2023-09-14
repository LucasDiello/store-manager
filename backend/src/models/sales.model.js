const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
    const [sales] = await connection.execute(
        `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date FROM
        sales_products sp
        INNER JOIN sales s 
        ON sp.sale_id = s.id `,
    );
    return camelize(sales);
};

const findById = async (id) => {
    const [sale] = await connection.execute(
        `SELECT s.date, sp.product_id, sp.quantity
        FROM sales s
        INNER JOIN sales_products sp ON s.id = sp.sale_id
        WHERE s.id = ?
        ORDER BY s.id ASC, sp.product_id ASC;
        `,
        [id],
    );
    return camelize(sale);
};

module.exports = {
    getAll,
    findById,
};