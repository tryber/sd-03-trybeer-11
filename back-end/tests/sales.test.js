const request = require('supertest');
const app = require('../app');
const { startDBAndErase, closeDB } = require('./banco');

const totalPrice = 22;
const deliveryAddress = 'Rua da Pinga';
const deliveryNumber = '132';
const products = [{
    id: '1',
    name: 'Skol Lata 250ml',
    price: 2.20,
    urlImage: 'http://localhost:3001/images/Skol Lata 350ml.jpg',
    sellingQnt: 10,
  }];

  describe('sale getAll', () => {
  let token;
  beforeAll(async () => startDBAndErase());

  afterAll(async () => closeDB());
  test('create user to test', async () => {
    const { body } = await request(app).post('/user')
      .send({
        name: 'Nome Qualquer',
        email: 'test@user.com',
        password: '123456',
        role: false,
      })
      .expect(201);
    expect(body.token).toMatch(/^[A-z0-9\-.]*$/);
    token = body.token;
  });

  test('create sale', async () => {
    expect(token).not.toBeUndefined();
    await request(app).post('/sales')
      .send({ totalPrice, deliveryAddress, deliveryNumber, products })
      .set('Authorization', token)
      .expect({ message: 'Venda processada!' });
  });

  test('get all sales', async () => {
    expect(token).not.toBeUndefined();
    await request(app).get('/sales')
      .set('Authorization', token)
      .expect(200);
  });

  test('get sales details', async () => {
    expect(token).not.toBeUndefined();

    const getSale = await request(app).get('/sales')
      .set('Authorization', token)
      .expect(200);

    const id = JSON.parse(getSale.res.text).sales[0].id

    await request(app).get(`/sales/${id}`)
      .set('Authorization', token)
      .expect(200);
  });

  test('update sale', async() => {
    expect(token).not.toBeUndefined();

    const getSale = await request(app).get('/sales')
      .set('Authorization', token)
      .expect(200);

    const id = JSON.parse(getSale.res.text).sales[0].id

    await request(app).put(`/sales/${id}`)
      .send({ status: 'Entregue' })
      .set('Authorization', token)
      .expect({ message: 'Entregue!' });
  });
});
