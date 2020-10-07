const { createSale, getAllSales, getSaleDetails, updateSale } = require('../controllers/sales');
const salesServices = require('../services/sales');
const Boom = require('boom');

const next = jest.fn();
const status = jest.fn().mockReturnThis();
const json = jest.fn();

jest.mock('../services/sales');
jest.mock('boom');

afterEach(() => {
  status.mockClear();
  json.mockClear();
  next.mockClear();
});

const unhauthorized = (message) => message;

describe('create sales', () => {
  test('should complete the creation of an sale', async () => {
    const user = { id: 12 };

    salesServices.checkoutSchema.validate.mockReturnValueOnce({ error: false, value: true });
    salesServices.addSale.mockResolvedValueOnce(user);

    const body = {
      totalPrice: 198,
      deliveryAddress: 'Rua da Pinga',
      deliveryNumber: 132,
      products: [{
        id: '1',
        name: 'Skol Lata 250ml',
        price: 2.20,
        urlImage: 'http://localhost:3001/images/Skol Lata 350ml.jpg',
      }],
    };

    await createSale({ body, user }, { json, status }, next);

    expect(salesServices.checkoutSchema.validate).toHaveBeenCalled();

    expect(salesServices.addSale).toHaveBeenCalled();

    expect(next).not.toHaveBeenCalled();

    expect(status).toHaveBeenCalled();
    expect(json).toHaveBeenCalled();
    expect(json).toHaveBeenCalledWith({ message: 'Venda processada!' });
  });
});

describe('get all sales', () => {
  test('shouuld can pass all that come from an service if client', async () => {
    const sales = [{ name: 'Skol' }];
    const user = { role: 'client' };

    salesServices.getAll.mockResolvedValueOnce(sales);

    await getAllSales({ user }, { json, status }, next);

    expect(status).toHaveBeenCalledTimes(1);
    expect(json).toHaveBeenCalledTimes(1);
    expect(json).toHaveBeenCalledWith({ sales });
  });
});

describe('getSaleDetails', () => {
  test('take sale details', async () => {
    const req = {
      params: { id: 12 },
      user: { id: 1, role: 'client' },
    };

    const sale = { id: 12, userId: 1 };
    const products = [{ name: 'sckol' }];

    salesServices.idSchema.validate.mockReturnValueOnce({ error: false, value: true });
    salesServices.getProducts.mockResolvedValueOnce(products);
    salesServices.getById.mockResolvedValueOnce(sale);

    await getSaleDetails(req, { json, status }, next);

    expect(next).not.toHaveBeenCalled();
    expect(status).toHaveBeenCalledTimes(1);
    expect(json).toHaveBeenCalledWith({ ...sale, products });
  });

  test('should throw call next if no client user have no permission to this sale', async () => {
    const req = { params: { id: 12 }, user: { id: 1, role: 'client' } };
    const sale = { id: 12, userId: 10 };
    const products = [{ name: 'sckol' }];

    salesServices.idSchema.validate.mockReturnValueOnce({ error: false, value: true });
    salesServices.getProducts.mockResolvedValueOnce(products);
    salesServices.getById.mockResolvedValueOnce(sale);
    Boom.unauthorized.mockImplementation(unhauthorized);

    await getSaleDetails(req, { json, status }, next);

    expect(next).toHaveBeenCalledWith('Você nao tem permissão para ver essa compra');
  });
});

describe('updateSale', () => {
  test('pass information to service and return services', async () => {
    const req = {
      params: { id: 12 },
      body: { status: 'Entregue' },
      user: { id: 105 },
    };

    salesServices.confirmOwnerShip.mockReturnValueOnce({ error: false });
    await updateSale(req, { json, status }, next);

    expect(salesServices.confirmOwnerShip).toHaveBeenCalledWith(105, 12);

    expect(next).not.toHaveBeenCalled();
    expect(json).toHaveBeenCalledWith({ message: 'Entregue!' });
  });
});
