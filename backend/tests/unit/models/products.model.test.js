const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { products } = require('../../mocks/products.mock');

describe('Testa o model de produtos', function () {
    it('Testa se o model de produtos possui o método getAll', async function () {
        sinon.stub(connection, 'execute').resolves([products]);
        const response = await productsModel.getAll();
        expect(response).to.be.an('array');
        expect(response).to.be.deep.equal(products);
    });

    it('Testa se o model de produtos possui o método findById', async function () {
        const id = 1;
        sinon.stub(connection, 'execute').resolves([[products[0]]]);
        const response = await productsModel.findById(id);
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal(products[0]);
    });

    afterEach(function () {
        sinon.restore();
    });
});