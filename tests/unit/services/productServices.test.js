const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productModel');
const productsService = require('../../../services/productService');

describe('Testa a camada de product services', () => {
  describe('Busca por todos os produtos em caso de sucesso', () => {
    const products = [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
      { id: 3, name: "Escudo do Capitão América" },
    ];
    before(() => {
      sinon.stub(productsModel, 'getAll')
        .resolves(products);
    });
    after(() => {
      productsModel.getAll.restore();
    });

    it('retorna um objeto com os produtos e o codigo para a resposta', async () => {
      const response = await productsService.getAll();

      expect(response).to.have.all.keys('data', 'code');
      expect(response.code).to.be.equal(200);
      expect(response.data).to.be.equal(products);
    });
  });

  describe('Busca por todos os produtos em caso de falha', () => {
    before(() => {
      sinon.stub(productsModel, 'getAll')
        .resolves(null);
    });
    after(() => {
      productsModel.getAll.restore();
    });

    it('retorna um objeto com o codigo para a resposta e a mensagem de erro', async () => {
      const response = await productsService.getAll();

      expect(response).to.have.all.keys('message', 'code');
      expect(response.code).to.be.equal(404);
      expect(response.message).to.be.equal('Product not found');
    });
  });

  describe('Busca por um produto em caso de sucesso', () => {
    const product = {
      id: '3',
      name: 'Escudo do Capitão América',
    };
    before(() => {
      sinon.stub(productsModel, 'getOne')
        .resolves(product);
    });
    after(() => {
      productsModel.getOne.restore();
    });

    it('retorna um objeto com os dados do produto e o codigo para a resposta', async () => {
      const response = await productsService.getOne(3);

      expect(response).to.have.all.keys('code', 'data');
      expect(response.code).to.be.equal(200);
      expect(response.data).to.be.equal(product);
    });
  });

  describe('Busca por um produto em caso de falha', () => {
    before(() => {
      sinon.stub(productsModel, 'getOne')
        .resolves(null);
    });
    after(() => {
      productsModel.getOne.restore();
    });
    
    it('retorna um objeto com o codigo para a resposta e a mensagem de erro', async () => {
      const response = await productsService.getOne(9);

      expect(response).to.have.all.keys('message', 'code');
      expect(response.code).to.be.equal(404);
      expect(response.message).to.be.equal('Product not found');
    });
  });
});
