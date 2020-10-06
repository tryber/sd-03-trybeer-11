const frisby = require('frisby');
const start = require('../app');
const { startDBAndErase, URL_BASE, closeDB } = require('./banco');
const { register, message } = require('./access');

// const closeServer = start();

const { Joi } = frisby;

// afterAll((done) => closeServer.close(done));

describe('sale getAll', () => {
  let token;

  beforeAll(async () => {
    await startDBAndErase();
    token = await register('user2@test.com', '123456', false);
  });

  afterAll(async () => {
    await closeDB();
  });

  test('get sale', async () => {
    const totalPrice = 198;
    const deliveryAddress = 'Rua da Pinga';
    const deliveryNumber = 132;
    const products = [{
      id: '1',
      name: 'Skol Lata 250ml',
      price: 2.20,
      urlImage: 'http://localhost:3001/images/Skol Lata 350ml.jpg',
    }];

    expect(token).not.toBe(message);
    expect(token).not.toBeUndefined();

    console.log(frisby.post.length);
    await frisby.post(
      `${URL_BASE}/sales`,
      { headers: { authorization: token } },
      { totalPrice, deliveryAddress, deliveryNumber, products },
    )
      // .expect('status', 200)
      .expect('json', { message: 'Venda Procesada' });
  });
});
