const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsControl } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');

const { products } = require('../../mocks/products.mock');

const { expect } = chai;

chai.use(sinonChai);

describe('Testa o controller de produtos', function () {
    it('Testa se o controller de produtos possui o método getAll', async function () {
        sinon.stub(productsService, 'getAll').resolves({ status: 'SUCCESSFUL', data: products });
        const req = {};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productsControl.getAll(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(products);
    });

    it('Testa se o controller de produtos possui o método findById', async function () {
        sinon.stub(productsService, 'findById').resolves({ status: 'SUCCESSFUL', data: products[0] });
        const req = { params: { id: 1 } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productsControl.findById(req, res);

        expect(res.status).to.have.been.calledWith(200);
        
        expect(res.json).to.have.been.calledWith(products[0]);
    });
});