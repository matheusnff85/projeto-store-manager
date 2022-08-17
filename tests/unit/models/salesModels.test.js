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
  describe('Testa a função verifySaleId', async () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([{id: 2, date: '2022-08-16 18:49:57' }]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('a função retorna um booleano', async () => {
      const result = await salesModel.verifySaleId(2);

      expect(result).to.be.a('boolean');
      expect(result).to.be.equal(true);
    });
  });

  describe('Testa a função getAll', async () => {
    const getAllReturn = [
      {
        saleId: 1,
        date: '2022-08-16T18:49:57.000Z',
        productId: 1,
        quantity: 5
      },
      {
        saleId: 2,
        date: '2022-08-16T18:49:57.000Z',
        productId: 3,
        quantity: 15
      },
      {
        saleId: 3,
        date: '2022-08-16T18:49:57.000Z',
        productId: 1,
        quantity: 1
      },
      {
        saleId: 3,
        date: '2022-08-16T18:49:57.000Z',
        productId: 2,
        quantity: 5
      }
    ];
    before(async () => {
      sinon.stub(connection, 'execute').resolves([getAllReturn]);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('a função retorna um array com todas as vendas', async () => {
      const result = await salesModel.getAll();
      
      expect(result).to.be.a('array');
      expect(result).to.have.length(4);
    });
  });
  
  describe('Testa a função getOne', async () => {
    const getOneResult = [
      {
        date: '2022-08-16T18:49:57.000Z',
        productId: 1,
        quantity: 1
      },
      {
        date: '2022-08-16T18:49:57.000Z',
        productId: 2,
        quantity: 5
      }
    ];
    before(async () => {
      sinon.stub(connection, 'execute').resolves([getOneResult]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('a função retorna um array com as vendas encontradas', async () => {
      const result = await salesModel.getOne(3);

      expect(result).to.be.a('array');
      expect(result).to.have.length(2);
    });
  });
  describe('Ao deletar uma venda da DB', async () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves(true);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('retorna true ao executar a query para deletar', async () => {
      const result = await salesModel.deleteSale(2);

      expect(result).to.be.equal(true);
    });
  });
});