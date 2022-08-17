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

describe('Testa o arquivo de products da camada de controllers', () => {
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
    const serviceReturn = { message: 'Product not found', code: 404 };

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

    it('o controller chama os metodos json e status com os dados corretos', async () => {
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
    const serviceReturn = { message: 'Product not found', code: 404 };

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

    it('o controller chama os metodos json e status com os dados corretos', async () => {
      await productsController.getOne(request, response);

      expect(response.json.calledWith({ message: serviceReturn.message })).to.be.equal(true);
      expect(response.status.calledWith(serviceReturn.code)).to.be.equal(true);
    });
  });
  describe('Em caso de falha ao tentar cadastrar um novo produto', async () => {
    const response = {};
    const request = {};
    const serviceReturn = { message: '"name" is required', code: 404 };

    before(() => {
      request.body = { productName: 'Lua' }
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      sinon.stub(productsService, 'createProduct')
        .resolves(serviceReturn);
    });
    after(() => {
      productsService.createProduct.restore();
    });

    it('o controller chama os metodos de json e status para falha', async () => {
      await productsController.createProduct(request, response);

      expect(response.json.calledWith({ message: serviceReturn.message })).to.be.equal(true);
      expect(response.status.calledWith(serviceReturn.code)).to.be.equal(true);
    });
  });
  describe('Em caso de sucesso ao cadastar um novo produto', async () => {
    const response = {};
    const request = {};
    const product = { id: 4, name: "Bandana do Naruto" };
    const serviceReturn = { data: product, code: 201 };

    before(() => {
      request.body = { productName: product.name };
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
      sinon.stub(productsService, 'createProduct')
        .resolves(serviceReturn);
    });
    after(() => {
      productsService.createProduct.restore();
    });
    it('o controller chama os metodos send e status para sucesso', async () => {
      await productsController.createProduct(request, response);

      expect(response.send.calledWith(serviceReturn.data)).to.be.equal(true);
      expect(response.status.calledWith(serviceReturn.code)).to.be.equal(true);
    });
  });

  describe('Em caso de falha ao atualizar um produto', async () => {
    const response = {};
    const request = {};
    const product = { id: 987, name: "Bandana do Naruto" };
    const serviceReturn = { message: 'Product not found', code: 404 };

    before(() => {
      request.params = { id: product.id };
      request.body = { newName: product.name };
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      sinon.stub(productsService, 'updateProduct')
        .resolves(serviceReturn);
    });
    after(() => {
      productsService.updateProduct.restore();
    });
    it('os metodos "status" e "json" são chamados corretamente', async () => {
      await productsController.updateProduct(request, response);

      expect(response.status.calledWith(serviceReturn.code)).to.be.equal(true);
      expect(response.json.calledWith({ message: serviceReturn.message })).to.be.equal(true);
    });
  });

  describe('Em caso de sucesso ao atualizar um produto', async () => {
    const response = {};
    const request = {};
    const product = { id: 3, name: "Bandana do Naruto" };
    const serviceReturn = { data: product, code: 200 };

    before(() => {
      request.params = { id: product.id };
      request.body = { productName: product.name };
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
      sinon.stub(productsService, 'updateProduct')
        .resolves(serviceReturn);
    });
    after(() => {
      productsService.updateProduct.restore();
    });

    it('os metodos "status" e "send" são chamados corretamente', async () => {
      await productsController.updateProduct(request, response);

      expect(response.status.calledWith(serviceReturn.code)).to.be.equal(true);
      expect(response.send.calledWith(serviceReturn.data)).to.be.equal(true);
    });
  });
  describe('Em caso de falha ao deletar um produto', async () => {
    const response = {};
    const request = {};
    const serviceReturn = { message: 'Product not found', code: 404 };

    before(() => {
      request.params = { id: product.id };
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      sinon.stub(productsService, 'deleteProduct')
        .resolves(serviceReturn);
    });
    after(() => {
      productsService.deleteProduct.restore();
    });
    it('os metodos "status" e "json" são chamados corretamente', async () => {
      await productsController.deleteProduct(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ message: serviceReturn.message })).to.be.equal(true);
    });
  });
  describe('Em caso de sucesso ao deletar um produto', async () => {
    const response = {};
    const request = {};
    const productId = 3;
    const serviceReturn = { code: 204 };

    before(() => {
      request.params = { id: productId };
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
      sinon.stub(productsService, 'deleteProduct')
        .resolves(serviceReturn);
    });
    after(() => {
      productsService.deleteProduct.restore();
    });
    it('O controller retorna apenas o codigo http', async () => {
      await productsController.deleteProduct(request, response);

      expect(response.status.calledWith(serviceReturn.code)).to.be.equal(true);
    });
  });
});
