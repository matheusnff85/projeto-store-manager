const sinon = require('sinon');
const { expect } = require('chai');
const productsController = require('../../../controllers/productController');
const productsService = require('../../../services/productService');

const products = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];

const product = [{ id: 3, name: "Escudo do Capitão América" }];

describe('Testa a camada de product controllers', () => {
  describe('A busca por todos os produtos foi um sucesso', async () => {
    const response = {};
    const request = {};
    const serviceReturn = { data: products, code: 200 };

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
      sinon.stub(productsService, 'getAll')
        .resolves(serviceReturn);
    });
    after(() => {
      productsService.getAll.restore();
    });
    it('o controller chama os metodos send e status com os dados corretos', async () => {
      await productsController.getAll(request, response);

      expect(response.send.calledWith(serviceReturn.data)).to.be.equal(true);
      expect(response.status.calledWith(serviceReturn.code)).to.be.equal(true);
    });
  });
  describe('Ao buscar por todos os produtos falhou', async () => {
    const response = {};
    const request = {};
    const serviceReturn = { message: 'Product not found', code: 200 };

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      sinon.stub(productsService, 'getAll')
        .resolves(serviceReturn);
    });
    after(() => {
      productsService.getAll.restore();
    });

    it('o controller chama os metodos send e status com os dados corretos', async () => {
      await productsController.getAll(request, response);

      expect(response.json.calledWith({ message: serviceReturn.message })).to.be.equal(true);
      expect(response.status.calledWith(serviceReturn.code)).to.be.equal(true);
    });
  });
  describe('A busca por apenas um produto foi um sucesso', async () => {
    const response = {};
    const request = {};
    const serviceReturn = { data: product, code: 200 };

    before(() => {
      request.params = { id: 3 };
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
      sinon.stub(productsService, 'getOne')
        .resolves(serviceReturn);
    });
    after(() => {
      productsService.getOne.restore();
    });
    it('o controller chama os metodos send e status com os dados corretos', async () => {
      await productsController.getOne(request, response);

      expect(response.send.calledWith(serviceReturn.data)).to.be.equal(true);
      expect(response.status.calledWith(serviceReturn.code)).to.be.equal(true);
    });
  });
  describe('Ao buscar por apenas um produto falhou', async () => {
    const response = {};
    const request = {};
    const serviceReturn = { message: 'Product not found', code: 200 };

    before(() => {
      request.params = { id: 984 };
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      sinon.stub(productsService, 'getOne')
        .resolves(serviceReturn);
    });
    after(() => {
      productsService.getOne.restore();
    });

    it('o controller chama os metodos send e status com os dados corretos', async () => {
      await productsController.getOne(request, response);

      expect(response.json.calledWith({ message: serviceReturn.message })).to.be.equal(true);
      expect(response.status.calledWith(serviceReturn.code)).to.be.equal(true);
    });
  });
});
