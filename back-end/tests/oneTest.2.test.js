const request = require('supertest');
const app = require('../app');
const { restartDb, closeTestDB } = require('./bancoTest');

afterAll((done) => done());
describe('user register', () => {
  let server;
  beforeAll(async () => {
    await restartDb();
    server = app.listen(4000);
  });

  afterAll(async (done) => {
    await closeTestDB(server);

    return server && server.close(done);
  });

  const user = {
    name: 'exampleGrande',
    email: 'example@example.com',
    password: '123456',
    role: false,
  };

  const resultObj = {
    id: /\d*/,
    email: 'example@example.com',
    token: /[A-z-=0-9.]*/,
    name: 'exampleGrande',
    role: 'client',
  };
  // test('Name should have at least 12 characters', async () => {
  //   const name = 'abcdefghijk';

  //   await request(app)
  //     .post('/user')
  //     .send({ ...user, name })
  //     .expect(422, { message: nameError });
  // });

  // test('Name should not have number', async () => {
  //   const name = 'Nome Qualquer2';

  //   await request(app).post('/user')
  //     .send({ ...user, name })
  //     .expect(422, { message: nameError });
  // });

  // test('Name should not have special characters', async () => {
  //   const name = '@Nome Qualquer';

  //   await request(app).post('/user')
  //     .send({ ...user, name })
  //     .expect(422, { message: nameError });
  // });

  // test('email should have the <name>@<dominio> format', async () => {
  //   const email = 'example@';

  //   await request(app).post('/user')
  //     .send({ ...user, email })
  //     .expect(422, { message: emailError });
  // });

  // test('email should not exists', async () => {
  //   const email = 'example@exa.com';

  //   const user2 = {
  //     name: 'mnopqrstuvwxyz',
  //     email,
  //     password: 'abcdef',
  //     role: 'false',
  //   };

  //   await request(app).post('/user')
  //     .send({ ...user, email })
  //     .expect(201);
  // })
  //   await request(app).post('/user')
  //     .send(user2)
  //     .expect(409, { message: emailDuplicatedError });
  // });

  test('Is possible create an commom user', async () => {
    const { body } = await request(server)
      .post('/user')
      .send(user);

    expect(body.email).toBe(resultObj.email);
    expect(typeof body.id).toMatch('number');
    expect(body.name).toBe(resultObj.name);
    expect(body.token).toMatch(resultObj.token);
  });
});
