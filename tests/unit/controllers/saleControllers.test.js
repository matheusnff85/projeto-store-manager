const sinon = require('sinon');
const { expect } = require('chai');
const salesController = require('../../../controllers/saleController');
const salesService = require('../../../services/saleService');

const products = [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }];

const modelResult = {
  id: 3,
  itemsSold: products,
}

describe('Testa o arquivo de sales para a camada de controllers', () => {
  describe('Em caso de sucesso ao criar uma nova venda', async () => {
    const response = {};
    const request = {};
    const sucessReturn = { data: modelResult, code: 201 }

    before(() => {
      request.body = products;
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
      sinon.stub(salesService, 'createNewSale').resolves(sucessReturn)
    });
    after(() => {
      salesService.createNewSale.restore();
    });
    it('os metodos de resposta são chamados corretamente', async () => {
      await salesController.createNewSale(request, response);

      expect(response.status.calledWith(sucessReturn.code)).to.be.equal(true);
      expect(response.send.calledWith(sucessReturn.data)).to.be.equal(true);
    });
  });
  describe('Em caso de falha ao criar uma nova venda', async () => {
    const response = {};
    const request = {};
    const failReturn = { message: 'Product not found', code: 404 }

    before(() => {
      request.body = [{ productId: 5, quantity: 1 }, { productId: 2, quantity: 5 }];
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      sinon.stub(salesService, 'createNewSale').resolves(failReturn)
    });
    after(() => {
      salesService.createNewSale.restore();
    });
    it('os metodos de resposta são chamados corretamente', async () => {
      await salesController.createNewSale(request, response);

      expect(response.status.calledWith(failReturn.code)).to.be.equal(true);
      expect(response.json.calledWith({ message: failReturn.message })).to.be.equal(true);
    });
  });
});