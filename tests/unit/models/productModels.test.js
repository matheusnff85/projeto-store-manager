const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productModel');

describe('Testa o arquivo de products da camada de models', () => {
  describe('Ao buscar por todos os produtos', async () => {
    before(async () => {
      const products = [
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },
        { id: 3, name: "Escudo do Capitão América" },
      ];
      sinon.stub(connection, 'execute').resolves([products]);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array com todos eles', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.a('array');
      expect(response).to.have.length(3);
    });
  });
  describe('Ao buscar por um produto', async () => {
    before(async () => {
      const product = [{id: 3, name: "Escudo do Capitão América" }];
      sinon.stub(connection, 'execute').resolves([product]);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto com os detalhes do produto', async () => {
      const productId = 3;
      const response = await productsModel.getOne(productId);

      expect(response).to.be.a('object');
      expect(response).to.have.all.keys('id', 'name');
    });
  });
  describe('Ao cadastrar um novo produto na DB', async () => {
    before(async () => {
      const product = [{ id: 4, name: "Bandana do Naruto" }];
      sinon.stub(connection, 'execute').resolves(product);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('Retorna um objeto com id e nome do produto cadastrado', async () => {
      const response = await productsModel.createProduct('Bandana do Naruto');

      expect(response).to.be.a('object');
      expect(response).to.have.all.keys('id', 'name');
    });
  });
  describe('Ao atualizar um produto da DB', async () => {
    before(async () => {
      const product = [{ id: 3, name: "Bandana do Naruto" }];
      sinon.stub(connection, 'execute').resolves(product);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('Retorna um objeto com o id e o novo nome do produto', async () => {
      const result = await productsModel.updateProduct(3, 'Bandana do Naruto');

      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('id', 'name');
    });
  });
  describe('Ao deletar um produto da DB', async () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves(true);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('retorna true ao executar a query para deletar', async () => {
      const result = await productsModel.deleteProduct(3);

      expect(result).to.be.equal(true);
    });
  });
});