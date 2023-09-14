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

module.exports = {
    getAll,
    findById,
};