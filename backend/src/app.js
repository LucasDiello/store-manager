const express = require('express');
const { productRoutes, salesRoutes } = require('./routes/index');

const app = express();
app.use('/products', productRoutes);
app.use('/sales', salesRoutes);
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
