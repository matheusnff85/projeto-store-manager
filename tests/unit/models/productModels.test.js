const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productModel');

describe('Testa a camada de product models', () => {
  describe('Ao buscar por todos os produtos', async () => {
    before(async () => {
      const products = [
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },
        { id: 3, name: "Escudo do Capitão América" },
      ];
      sinon.stub(connection, 'execute').resolves(products);
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
      sinon.stub(connection, 'execute').resolves(product);
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
});