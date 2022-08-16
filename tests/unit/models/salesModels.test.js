const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/saleModel');

const products = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
];

const modelResult = {
  id: 3,
  itemsSold: products,
}

describe('Testa o arquivo de sales da camada de models', () => {
  describe('Testa a função createSaleId', async () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: modelResult.id }]);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('a função retorna um numero que equivale ao id da venda', async () => {
      const result = await salesModel.createSaleId();

      expect(result).to.be.a('number');
      expect(result).to.be.equal(modelResult.id);
    });
  });

  describe('Testa a função createNewSale', async () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves(true);
    });
    after(async () => {
      connection.execute.restore();
    });
    
    it('A função retorna true ao fim de sua execução', async () => {
      const result = await salesModel.createNewSale(modelResult.id, products);

      expect(result).to.be.a('boolean');
      expect(result).to.be.equal(true);
    });
  });
  describe('Testa a função verifySaleId', async () => { });
  describe('Testa a função getAll', async () => { });
  describe('Testa a função getOne', async () => { });
});