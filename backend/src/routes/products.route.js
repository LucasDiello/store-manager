const route = require('express').Router();
const { productsControl } = require('../controllers');

route.get('/', async (_req, res) => productsControl.getAll(_req, res));

route.get('/:id', async (req, res) => productsControl.findById(req, res));

route.post('/', async (req, res) => productsControl.createProduct(req, res));

module.exports = route;