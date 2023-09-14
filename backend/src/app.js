const express = require('express');
const productRoute = require('./routes/products.route');

const app = express();
app.use('/products', productRoute);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
