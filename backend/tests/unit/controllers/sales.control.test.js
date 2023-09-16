const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesControl } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');

const { sales, salesById } = require('../../mocks/sales.mock');

const { expect } = chai;

chai.use(sinonChai);

describe('Testa o controller de vendas', function () {
    it('Testa se o controller de vendas possui o método getAll', async function () {
        sinon.stub(salesService, 'getAll').resolves({ status: 'SUCCESSFUL', data: sales });
        const req = {};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await salesControl.getAll(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(sales);
    });

    it('Testa se o controller de vendas possui o método findById', async function () {
        sinon.stub(salesService, 'findById').resolves({ status: 'SUCCESSFUL', data: salesById });
        const req = { params: { id: 1 } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await salesControl.findById(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(salesById);
    });

    it('Testa se o controller de vendas possui o método createSaleProducts', async function () {
        sinon.stub(salesService, 'createSaleProducts').resolves({ status: 'SUCCESSFUL', data: sales });
        const req = { body: [{ productId: 1, quantity: 1 }] };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await salesControl.createSaleProducts(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(sales);
    });

    afterEach(function () {
        sinon.restore();
    });
});