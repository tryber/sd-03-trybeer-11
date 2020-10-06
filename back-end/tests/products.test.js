const request = require('supertest');
const app = require('../app');
// const { startDBAndErase, URL_BASE, closeDB } = require('./banco');

// afterAll((done) => server.close(done));

describe('products getAll', () => {
  // beforeAll(async () => {
  //   await startDBAndErase();
  // });

  // afterAll(async () => {
  //   await closeDB();
  // });

  test('get products', async () => {
    const { body } = await request(app).post('/user')
      .send({
        email: 'user@email.com',
        name: 'Nome Qualquer',
        password: '123456',
        role: true,
      })
      .expect(201);

    const { token } = body;

    // expect(token).not.toBeUndefined();

    // await request(app).get('/products')
    //   .set('Authorization', token)
    //   .expect(200);
    // .expect('jsonTypes', {
    //   products: Joi.array().items({
    //     name: Joi.string().required(),
    //     urlImage: Joi.string().required(),
    //   })
    //     .required(),
    // });
  });
});
