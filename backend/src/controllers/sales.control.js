const { salesService } = require('../services');
const { mapStatusHTTP } = require('../../utils/mapStatusHTTP');

const getAll = async (_req, res) => {
    const { status, data } = await salesService.getAll();
    res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await salesService.findById(id);
    res.status(mapStatusHTTP(status)).json(data);
};

const createSaleProducts = async (req, res) => {
    const itensSold = req.body;
    const { status, data } = await salesService.createSaleProducts(itensSold);
    res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
    getAll,
    findById,
    createSaleProducts,
};