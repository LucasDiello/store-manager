const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { sales, salesById, createSaleRequest, createSaleResponse,
     failedCreateSaleRequest, failedQuantityCreateSaleRequest } = require('../../mocks/sales.mock');

describe('Testa o service de vendas', function () {
    it('Testa se o service de vendas possui o método getAll', async function () {
        sinon.stub(salesModel, 'getAll').resolves(sales);
        const response = await salesService.getAll();
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal({ status: 'SUCCESSFUL', data: sales });
    });

    it('Testa se o service de vendas possui o método findById', async function () {
        sinon.stub(salesModel, 'findById').resolves(salesById);
        const response = await salesService.findById(1);
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal({ status: 'SUCCESSFUL', data: salesById });
    });

    it('Testa se o service de vendas possui o método createSaleProducts', async function () {
        sinon.stub(salesModel, 'createSaleProducts').resolves(createSaleResponse);
        const response = await salesService.createSaleProducts(createSaleRequest);
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal({ status: 'CREATED', data: createSaleResponse });
    });

    it('Testa se o method createSaleProducts retorna um erro quando o produto não existe', async function () {
        sinon.stub(salesModel, 'createSaleProducts').resolves(createSaleResponse);
        sinon.stub(salesModel, 'getAll').resolves([]);
        const response = await salesService.createSaleProducts(failedCreateSaleRequest);
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
    });

    it('Testa se o method createSaleProducts retorna um erro quando a quantidade é menor que 1', async function () {
        sinon.stub(salesModel, 'createSaleProducts').resolves(createSaleResponse);
        const response = await salesService.createSaleProducts(failedQuantityCreateSaleRequest);
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal({ status: 'UNPROCESSABLE_ENTITY', data: { message: '"quantity" must be greater than or equal to 1' } });
    });

    it('Testa se o method createSaleProducts retorna um erro quando a quantidade não é informada', async function () {
        sinon.stub(salesModel, 'createSaleProducts').resolves(createSaleResponse);
        const response = await salesService.createSaleProducts([{ productId: 1 }]);
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal({ status: 'BAD_REQUEST', data: { message: '"quantity" is required' } });
    });

    it('Testa se o method createSaleProducts retorna um erro quando o produto não é informado', async function () {
        sinon.stub(salesModel, 'createSaleProducts').resolves(createSaleResponse);
        const response = await salesService.createSaleProducts([{ quantity: 1 }]);
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal({ status: 'BAD_REQUEST', data: { message: '"productId" is required' } });
    });

    it('Testa se o service de vendas possui o método deleteSale', async function () {
        sinon.stub(salesModel, 'deleteSale').resolves();
        const response = await salesService.deleteSale(1);
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal({ status: 'NOT_CONTENT', data: { message: 'Sale deleted successfully' } });
    });

    it('Testa se o method deleteSale retorna um erro quando o produto não existe', async function () {
        sinon.stub(salesModel, 'deleteSale').resolves();
        sinon.stub(salesModel, 'getAll').resolves([]);
        const response = await salesService.deleteSale(999);
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });
    });

    afterEach(function () {
        sinon.restore();
    });
});