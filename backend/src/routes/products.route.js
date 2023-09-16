const route = require('express').Router();
const { productsControl } = require('../controllers');

route.get('/', async (_req, res) => productsControl.getAll(_req, res));

route.get('/:id', async (req, res) => productsControl.findById(req, res));

route.post('/', async (req, res) => productsControl.createProduct(req, res));

route.put('/:id', async (req, res) => productsControl.updateProduct(req, res));

route.delete('/:id', async (req, res) => productsControl.deleteProduct(req, res));

module.exports = route;