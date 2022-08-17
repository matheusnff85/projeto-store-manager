const sinon = require('sinon');
const { expect } = require('chai');
const salesController = require('../../../controllers/saleController');
const salesService = require('../../../services/saleService');

const products = [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }];

const modelResult = {
  id: 3,
  itemsSold: products,
}

describe('Testa o arquivo de sales para a camada de controllers', () => {
  describe('Em caso de sucesso ao criar uma nova venda', async () => {
    const response = {};
    const request = {};
    const sucessReturn = { data: modelResult, code: 201 }

    before(() => {
      request.body = products;
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
      sinon.stub(salesService, 'createNewSale').resolves(sucessReturn)
    });
    after(() => {
      salesService.createNewSale.restore();
    });
    it('os metodos de resposta são chamados corretamente', async () => {
      await salesController.createNewSale(request, response);

      expect(response.status.calledWith(sucessReturn.code)).to.be.equal(true);
      expect(response.send.calledWith(sucessReturn.data)).to.be.equal(true);
    });
  });
  describe('Em caso de falha ao criar uma nova venda', async () => {
    const response = {};
    const request = {};
    const failReturn = { message: 'Product not found', code: 404 }

    before(() => {
      request.body = [{ productId: 90, quantity: 1 }, { productId: 2, quantity: 5 }];
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      sinon.stub(salesService, 'createNewSale').resolves(failReturn)
    });
    after(() => {
      salesService.createNewSale.restore();
    });
    it('os metodos de resposta são chamados corretamente', async () => {
      await salesController.createNewSale(request, response);

      expect(response.status.calledWith(failReturn.code)).to.be.equal(true);
      expect(response.json.calledWith({ message: failReturn.message })).to.be.equal(true);
    });
  });
  describe('A busca por todas as vendas foi um sucesso', async () => {
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
    const response = {};
    const request = {};
    const serviceReturn = { code: 200, data: getAllReturn };

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
      sinon.stub(salesService, 'getAll').resolves(serviceReturn)
    });
    after(() => {
      salesService.getAll.restore();
    });
    it('os metodos "status" e "send" são chamados corretamente', async () => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(serviceReturn.code)).to.be.equal(true);
      expect(response.send.calledWith(serviceReturn.data)).to.be.equal(true);
    });
  });

  describe('A busca por todas as vendas falhou', async () => {
    const response = {};
    const request = {};
    const failReturn = { message: 'Sale not found', code: 404 }

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      sinon.stub(salesService, 'getAll').resolves(failReturn)
    });
    after(() => {
      salesService.getAll.restore();
    });
    it('os metodos "status" e "json" são chamados corretamente', async () => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(failReturn.code)).to.be.equal(true);
      expect(response.json.calledWith({ message: failReturn.message })).to.be.equal(true);
    });
  });

  describe('A busca por Id da venda foi um sucesso', async () => {
    const getOneReturn = [
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
    const response = {};
    const request = {};
    const serviceReturn = { code: 200, data: getOneReturn };

    before(() => {
      request.params = { id: 3 };
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
      sinon.stub(salesService, 'getOne').resolves(serviceReturn)
    });
    after(() => {
      salesService.getOne.restore();
    });

    it('Os metodos "staus" e "send" são chamados corretamente', async () => {
      await salesController.getOne(request, response);

      expect(response.status.calledWith(serviceReturn.code)).to.be.equal(true);
      expect(response.send.calledWith(serviceReturn.data)).to.be.equal(true);
    });
  });
  describe('A busca por Id da venda falhou', async () => {
    const response = {};
    const request = {};
    const failReturn = { message: 'Sale not found', code: 404 }

    before(() => {
      request.params = { id: 987 };
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      sinon.stub(salesService, 'getOne').resolves(failReturn)
    });
    after(() => {
      salesService.getOne.restore();
    });
    it('Os metodos "status" e "json" são chamados corretamente', async () => {
      await salesController.getOne(request, response);

      expect(response.status.calledWith(failReturn.code)).to.be.equal(true);
      expect(response.json.calledWith({ message: failReturn.message })).to.be.equal(true);
    });
  });
  describe('Em caso de falha ao deletar uma venda', async () => {
    const response = {};
    const request = {};
    const serviceReturn = { message: 'Sale not found', code: 404 };

    before(() => {
      request.params = { id: 9987 };
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      sinon.stub(salesService, 'deleteSale')
        .resolves(serviceReturn);
    });
    after(() => {
      salesService.deleteSale.restore();
    });
    it('os metodos "status" e "json" são chamados corretamente', async () => {
      await salesController.deleteSale(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ message: serviceReturn.message })).to.be.equal(true);
    });
  });
  describe('Em caso de sucesso ao deletar uma venda', async () => {
    const response = {};
    const request = {};
    const saleId = 2;
    const serviceReturn = { code: 204 };

    before(() => {
      request.params = { id: saleId };
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
      sinon.stub(salesService, 'deleteSale')
        .resolves(serviceReturn);
    });
    after(() => {
      salesService.deleteSale.restore();
    });
    it('O controller retorna apenas o codigo http', async () => {
      await salesController.deleteSale(request, response);

      expect(response.status.calledWith(serviceReturn.code)).to.be.equal(true);
    });
  });
});