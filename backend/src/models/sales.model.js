const connection = require('./connection');

const mapKeysToCamelCase = (obj) => {
    if (!obj) return obj;

    const camelCaseObj = {};
    Object.keys(obj).forEach((key) => {
        const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        camelCaseObj[camelCaseKey] = obj[key];
    });
    return camelCaseObj;
};

const getAll = async () => {
    const [sales] = await connection.execute(
        `SELECT sp.sale_id as saleId, sp.product_id as productId, sp.quantity, s.date FROM
        sales_products sp
        INNER JOIN sales s 
        ON sp.sale_id = s.id`,
    );

    const camelCaseSales = sales.map(mapKeysToCamelCase);
    return camelCaseSales;
};

const findById = async (id) => {
    const [sale] = await connection.execute(
        `SELECT s.date, sp.product_id as productId, sp.quantity
        FROM sales s
        INNER JOIN sales_products sp ON s.id = sp.sale_id
        WHERE s.id = ?
        ORDER BY s.id ASC, sp.product_id ASC;
        `,
        [id],
    );

    const camelCaseSale = sale.map(mapKeysToCamelCase);
    return camelCaseSale;
};

const createSale = async () => {
    const [{ insertId }] = await connection.execute(
        'INSERT INTO sales () VALUES ()',
    );
    return insertId;
};

const createSaleProducts = async (sales) => {
    const insertId = await createSale();

    const insertPromises = sales.map(({ productId, quantity }) => 
         connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [insertId, productId, quantity],
    ));
    
    await Promise.all(insertPromises);

    return { id: insertId, itemsSold: sales };
};

const deleteSale = async (id) => {
    await connection.execute(
        'DELETE FROM sales WHERE id = ?',
        [id],
    );
};

module.exports = {
    getAll,
    findById,
    mapKeysToCamelCase,
    createSaleProducts,
    deleteSale,
};
