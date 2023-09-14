const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { products } = require('../../mocks/products.mock');

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

    afterEach(function () {
        sinon.restore();
    });
});