const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { products, createProduct } = require('../../mocks/products.mock');

describe('Testa o model de produtos', function () {
    it('Buscando todos os produtos', async function () {
        sinon.stub(productsModel, 'getAll').resolves(products);
        
        const response = await productsService.getAll();
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal({ status: 'SUCCESSFUL', data: products });
    });

    it('Buscando produto pelo id', async function () {
        sinon.stub(productsModel, 'findById').resolves(products[0]);

        const response = await productsService.findById(1);
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal({ status: 'SUCCESSFUL', data: products[0] });
    });

    it('Buscando produto pelo id que não existe', async function () {
        sinon.stub(productsModel, 'findById').resolves(null);

        const response = await productsService.findById();
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
    });

    it('Criando um produto', async function () {
        sinon.stub(productsModel, 'createProduct').resolves(createProduct);
        const { name } = createProduct;
        const response = await productsService.createProduct(name);
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal({ status: 'CREATED', data: createProduct });
    });

    it('Criando um produto com o nome vazio', async function () {
        const name = '';
        sinon.stub(productsModel, 'createProduct').resolves(null);
        const response = await productsService.createProduct(name);
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal({ status: 'BAD_REQUEST', data: { message: '"name" is required' } });
    });

    it('Criando um produto com o nome menor que 5 caracteres', async function () {
        const name = 'oi';
        sinon.stub(productsModel, 'createProduct').resolves(null);
        const response = await productsService.createProduct(name);
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal({ status: 'UNPROCESSABLE_ENTITY', data: { message: '"name" length must be at least 5 characters long' } });
    });

    afterEach(function () {
        sinon.restore();
    });
});