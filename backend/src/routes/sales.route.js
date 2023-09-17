const route = require('express').Router();
const { salesControl } = require('../controllers');

route.get('/', async (_req, res) => salesControl.getAll(_req, res));

route.get('/:id', async (req, res) => salesControl.findById(req, res));

route.post('/', async (req, res) => salesControl.createSaleProducts(req, res));

route.delete('/:id', async (req, res) => salesControl.deleteSale(req, res));

module.exports = route;