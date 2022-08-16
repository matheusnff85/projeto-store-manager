const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/saleModel');
const salesService = require('../../../services/saleService');
const productsModel = require('../../../models/productModel');

const products = [{ productId: 1, quantity: 1 },{ productId: 2, quantity: 5 }];

const modelResult = {
  id: 3,
  itemsSold: products,
}

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

    it('retorna um objeto com as chaves "code" e "data" para serem usadas no controller', async () => {
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
});
