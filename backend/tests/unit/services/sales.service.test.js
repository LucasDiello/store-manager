const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { sales, salesById } = require('../../mocks/sales.mock');

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
});