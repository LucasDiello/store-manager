const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { sales, salesById, createSaleRequest, createSaleResponse } = require('../../mocks/sales.mock');
const { mapKeysToCamelCase } = require('../../../src/models/sales.model');
const connection = require('../../../src/models/connection');

const { expect } = chai;

describe('Testa o model de vendas', function () {
    it('Testa se o model de vendas possui o método getAll', async function () {
        sinon.stub(connection, 'execute').resolves([sales]);
        
        const response = await salesModel.getAll();
        expect(response).to.be.an('array');
        expect(response).to.be.deep.equal(sales);
    });
    it('Testa se o model de vendas possui o método findById', async function () {
        sinon.stub(connection, 'execute').resolves([salesById]);
        
        const response = await salesModel.findById(1);
        expect(response).to.be.an('array');
        expect(response).to.be.deep.equal(salesById);
    });

    it('Testa função transform CamelCase', function () {
        const snakeCaseObj = {
            ' monkey_luffy ': '1',
            ' roronoa_zoro ': '2',
        };
    
        const camelCaseObj = mapKeysToCamelCase(snakeCaseObj);
    
        expect(camelCaseObj).to.deep.equal({
            ' monkeyLuffy ': '1',
            ' roronoaZoro ': '2',
        });
    });

    it('Testa se o model de vendas possui o método createSale', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

        const response = await salesModel.createSaleProducts(createSaleRequest);
        expect(response).to.be.an('object');
        expect(response).to.be.deep.equal(createSaleResponse);
    });

    it('Testa se o model de vendas possui o método deleteSale', async function () {
        sinon.stub(connection, 'execute').resolves();
        const response = await salesModel.deleteSale(1);
        expect(response).to.equal(undefined);
    });

    afterEach(function () {
        sinon.restore();
    });
});