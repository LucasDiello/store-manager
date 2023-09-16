const { productsService } = require('../services');
const { mapStatusHTTP } = require('../../utils/mapStatusHTTP');

const getAll = async (_req, res) => {
    const { status, data } = await productsService.getAll();
    res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productsService.findById(id);
    res.status(mapStatusHTTP(status)).json(data);
};

const createProduct = async (req, res) => {
    const { name } = req.body;
    const { status, data } = await productsService.createProduct(name);
    res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { status, data } = await productsService.updateProduct(id, name);
    res.status(mapStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productsService.deleteProduct(id);
    res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
    getAll,
    findById,
    createProduct,
    updateProduct,
    deleteProduct,
};