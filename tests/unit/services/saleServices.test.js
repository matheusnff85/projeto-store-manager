const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/saleModel');
const salesService = require('../../../services/saleService');
const productsModel = require('../../../models/productModel');

const products = [{ productId: 1, quantity: 1 },{ productId: 2, quantity: 5 }];

describe('Testa o arquivo de sales da camada de services', () => {
  describe('O payload inserido contém os dados corretos', async () => {
    before(() => {
      sinon.stub(salesModel, 'createSaleId').resolves(3);
      sinon.stub(salesModel, 'createNewSale').resolves(true);
      sinon.stub(productsModel, 'getOne').resolves(true);
    });
    after(() => {
      salesModel.createSaleId.restore();
      salesModel.createNewSale.restore();
      productsModel.getOne.restore();
    });

    it('retorna um objeto com as chaves "code" e "data"', async () => {
      const result = await salesService.createNewSale(products);

      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('data', 'code');
    });
    it('o objeto retornado contém o "code" e "data" corretos', async () => {
      const result = await salesService.createNewSale(products);

      expect(result.code).to.be.equal(201);
      expect(result.data).to.have.all.keys('id', 'itemsSold');
      expect(result.data.id).to.be.equal(3);
      expect(result.data.itemsSold).to.be.equal(products);
    });
  });
  describe('O payload informado contém um ou mais produtos inválidos', async () => {
    const invalidProductId = [{ productId: 1, quantity: 1 }, { productId: 99999, quantity: 5 }];
    before(() => {
      sinon.stub(productsModel, 'getOne').resolves(undefined);
    });
    after(() => {
      productsModel.getOne.restore();
    });

    it('retorna um objeto com o codigo de erro e a mensagem', async () => {
      const result = await salesService.createNewSale(invalidProductId);

      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'message');
      expect(result.code).to.be.equal(404);
      expect(result.message).to.be.equal('Product not found');
    });
  })
  describe('O payload informado contém um erro na quantidade', async () => {
    const noQuantity = [{ productId: 2, quantity: 1 }, { productId: 2 }];
    const invalidQuantity = [{ productId: 1, quantity: 1 }, { productId: 3, quantity: 0 }];
    before(() => {
      sinon.stub(productsModel, 'getOne').resolves(true);
    });
    after(() => {
      productsModel.getOne.restore();
    });

    it('Uma ou mais quantidades não foram informadas', async () => {
      const result = await salesService.createNewSale(noQuantity);

      expect(result).to.have.all.keys('code', 'message');
      expect(result.code).to.be.equal('400');
      expect(result.message).to.be.equal('"quantity" is required');
    });
    it('uma ou mais das quantidades informadas é menor ou igual a zero', async () => {
      const result = await salesService.createNewSale(invalidQuantity);

      expect(result).to.have.all.keys('code', 'message');
      expect(result.code).to.be.equal('422');
      expect(result.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });
  });
  describe('Testa o retorno da função para listar todas as vendas', async () => {
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
    before(() => {
      sinon.stub(salesModel, 'getAll').resolves(getAllReturn);
    });
    after(() => {
      salesModel.getAll.restore();
    });

    it('A função retorna um objeto com as chaves "code" e "data" ', async () => {
      const result = await salesService.getAll();

      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'data');
    });
    it('Os dados das chaves "code" e "data" estão corretos', async () => {
      const result = await salesService.getAll();

      expect(result.code).to.be.equal(200);
      expect(result.data).to.be.equal(getAllReturn);
    });
  });
  describe('A função que busca todas as vendas não retorna nada', async () => {
    before(() => {
      sinon.stub(salesModel, 'getAll').resolves(null);
    });
    after(() => {
      salesModel.getAll.restore();
    });
    it('Retorna um objeto com as chaves "code" e "message" com suas informações', async () => {
      const result = await salesService.getAll();

      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('code', 'message');
      expect(result.code).to.be.equal(404);
      expect(result.message).to.be.equal('Sale not found');
    });
  });
  describe('Testa o retorno da função de buscar vendas pelo Id', async () => {
    describe('O payload informado possui os dados corretos', async () => {
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
      before(() => {
        sinon.stub(salesModel, 'getOne').resolves(getOneResult);
        sinon.stub(salesModel, 'verifySaleId').resolves(true);
      });
      after(() => {
        salesModel.getOne.restore();
        salesModel.verifySaleId.restore();
      });
      it('Retorna um objeto com as chaves "code" e "data"', async () => {
        const result = await salesService.getOne(3);

        expect(result).to.be.a('object');
        expect(result).to.have.all.keys('code', 'data');
      });
      it('O objeto retornado possui os dados corretos', async () => {
        const result = await salesService.getOne(3);

        expect(result.code).to.be.equal(200);
        expect(result.data).to.be.equal(getOneResult);
      });
    });

    describe('O payload informado possui os dados incorretos', async () => {
      before(() => {
        sinon.stub(salesModel, 'verifySaleId').resolves(false);
      });
      after(() => {
        salesModel.verifySaleId.restore();
      });
      it('retorna um objeto com as chaves "code" e "message"', async () => {
        const result = await salesService.getOne(9846);

        expect(result).to.be.a('object');
        expect(result).to.have.all.keys('code', 'message');
      });
      it('O objeto retornado possui os dados corretos', async () => {
        const result = await salesService.getOne(9846);

        expect(result.code).to.be.equal(404);
        expect(result.message).to.be.equal('Sale not found');
      });
    });
  });
});
