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
  describe('Ao tentar cadastrar um produto com o payload inválido', async () => {
    it('o nome do produto não foi informado', async () => {
      const response = await productsService.createProduct('');

      expect(response).to.have.all.keys('code', 'message');
      expect(response.code).to.be.equal('400');
      expect(response.message).to.be.equal('"name" is required');
    });
    it('o nome do produto possui menos de 5 caracteres', async () => {
      const response = await productsService.createProduct('Lua');

      expect(response).to.have.all.keys('code', 'message');
      expect(response.code).to.be.equal('422');
      expect(response.message).to.be.equal('"name" length must be at least 5 characters long');
    });
  });
  describe('Ao tentar cadastrar um produto com as informações corretas', async () => {
    const productName = 'Bandana do Naruto';
    before(() => {
      sinon.stub(productsModel, 'createProduct')
        .resolves({ id: 4, name: productName });
    });
    after(() => {
      productsModel.createProduct.restore();
    });
    it('retorna um objeto com as informações do produto cadastrado', async () => {
      const response = await productsService.createProduct(productName);

      expect(response).to.be.a('object');
    });
    it('o objeto recebido contém as informações corretas para a resposta', async () => {
      const response = await productsService.createProduct(productName);

      expect(response).to.have.all.keys('code', 'data');
      expect(response.code).to.be.equal(201);
      expect(response.data).to.have.all.keys('id', 'name');
      expect(response.data.name).to.be.equal(productName);
    });
  });
});
