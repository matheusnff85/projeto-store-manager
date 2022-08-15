const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/saleModel');

const newSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const modelResult = {
  id: 3,
  itemsSold: newSale,
}

describe('Testa o arquivo de sales da camada de models', () => {
  describe('É retornado um objeto ao adicionar uma nova venda a db', async () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: modelResult.id }]);
      sinon.stub(connection, 'query').resolves();
    });
    after(async () => {
      connection.execute.restore();
      connection.query.restore();
    });

    it('o objeto possui as "id" e "itemsSold"', async () => {
      const result = await salesModel.createNewSale(newSale);

      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('id', 'itemsSold');
      expect(result.itemsSold).to.have.length(2);
      expect(result.id).to.be.equal(modelResult.id);
    });
  });
});