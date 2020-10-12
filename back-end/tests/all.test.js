const request = require('supertest');
const app = require('../app');
const { restartDb, closeTestDB } = require('./bancoTest');

// const user = {
//   name: 'exampleGrande',
//   email: 'example@example.com',
//   password: '123456',
//   role: false,
// };

// const resultObj = {
//   id: /\d*/,
//   email: 'example@example.com',
//   token: /[A-z-=0-9.]*/,
//   name: 'exampleGrande',
//   role: 'client',
// };
afterAll((done) => done());
describe('user register', () => {
  const nameError = 'pelo menos 12 caracteres, não pode conter numeros nem caracteres especiais';
  const emailError = 'email tem que ser no formato <nome@dominio>';
  const passwordError = 'senha de pelo menos 6 digitos';
  const lessInfoError = 'Faltando informacoes';
  const emailDuplicatedError = 'E-mail already in database.';
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

  test('Is possible create an commom user', async () => {
    const { body } = await request(app)
      .post('/user')
      .send(user);

    expect(body.email).toBe(resultObj.email);
    expect(typeof body.id).toMatch('number');
    expect(body.name).toBe(resultObj.name);
    expect(body.token).toMatch(resultObj.token);
  });

  test('Name should have at least 12 characters', async () => {
    const name = 'abcdefghijk';

    await request(app)
      .post('/user')
      .send({ ...user, name })
      .expect(422, { message: nameError });
  });

  test('Name should not have number', async () => {
    const name = 'Nome Qualquer2';

    await request(app).post('/user')
      .send({ ...user, name })
      .expect(422, { message: nameError });
  });

  test('Name should not have special characters', async () => {
    const name = '@Nome Qualquer';

    await request(app).post('/user')
      .send({ ...user, name })
      .expect(422, { message: nameError });
  });

  test('email should have the <name>@<dominio> format', async () => {
    const email = 'example@';

    await request(app).post('/user')
      .send({ ...user, email })
      .expect(422, { message: emailError });
  });

  test('email should not exists', async () => {
    const email = 'example@exa.com';

    const user2 = {
      name: 'mnopqrstuvwxyz',
      email,
      password: 'abcdef',
      role: 'false',
    };

    await request(app).post('/user')
      .send({ ...user, email })
      .expect(201);

    await request(app).post('/user')
      .send(user2)
      .expect(409, { message: emailDuplicatedError });
  });

  test('password wrong should throw error', async () => {
    const password = '12345';
    await request(app).post('/user')
      .send({ ...user, password })
      .expect(422, { message: passwordError });
  });

  test('error if have no password info', async () => {
    const { password, ...incompletUser } = user;

    await request(app).post('/user', incompletUser)
      .expect(422, { message: lessInfoError });
  });
});

describe('login', () => {
  const erroEmailOrPassword = 'email ou senha inválido';
  const email = 'example@example.com';
  const password = '123456';

  const user = {
    name: 'exampleGrande',
    email,
    password,
    role: false,
  };

  const resultObj = {
    email: 'example@example.com',
    token: /[A-z0-9.]/,
    name: 'exampleGrande',
    role: 'client',
  };

  let server;
  beforeAll(async () => {
    await restartDb();
    server = app.listen(4000);
  });

  afterAll(async (done) => {
    await closeTestDB(server);

    return server && server.close(done);
  });

  test('should be possible to login with right return', async () => {
    const { body } = await request(app).post('/user')
      .send(user)
      .expect(201);

    expect(body.email).toBe(resultObj.email);
    expect(typeof body.id).toBe('number');
    expect(body.name).toBe(resultObj.name);
    expect(body.token).toMatch(resultObj.token);

    const { body: body2 } = await request(app).post('/user/login')
      .send({ email: 'example@example.com', password: '123456' })
      .expect(200);

    expect(body2.email).toBe(resultObj.email);
    expect(typeof body2.id).toBe('number');
    expect(body2.name).toBe(resultObj.name);
    expect(body2.token).toMatch(resultObj.token);
  });

  test('should not be possible enter with wrong password', async () => {
    await request(app).post('/user/login')
      .send({ email, password: '123451' })
      .expect(401, { message: erroEmailOrPassword });
  });

  test('should not be possible enter with an non existent email', async () => {
    await request(app).post('/user/login')
      .send({ email: 'noaexiste@certeza.com', password })
      .expect(401, { message: erroEmailOrPassword });
  });
});

describe('change user', () => {
  let token;
  const email = 'example@example.com';
  const password = '123456';

  const user = {
    name: 'exampleGrande',
    email,
    password,
    role: false,
  };

  let server;
  beforeAll(async () => {
    await restartDb();
    server = app.listen(4000);
  });

  afterAll(async (done) => {
    await closeTestDB(server);

    return server && server.close(done);
  });

  test('create user to test', async () => {
    const { body } = await request(app).post('/user')
      .send(user)
      .expect(201);

    expect(body.token).toMatch(/^[A-z0-9\-.]*$/);

    token = body.token;
  });

  test('should edit user', async () => {
    const newName = 'Novo nome de usuario';
    await request(app).put('/user/profile')
      .set('Authorization', token)
      .send({ name: newName })
      .expect(200);
  });
});

describe('get user', () => {
  let token;
  const email = 'example@example.com';
  const password = '123456';

  const user = {
    name: 'exampleGrande',
    email,
    password,
    role: false,
  };

  let server;
  beforeAll(async () => {
    await restartDb();
    server = app.listen(4000);
  });

  afterAll(async (done) => {
    await closeTestDB(server);

    return server && server.close(done);
  });

  test('create user to test', async () => {
    const { body } = await request(app).post('/user')
      .send(user)
      .expect(201);

    expect(body.token).toMatch(/^[A-z0-9\-.]*$/);

    token = body.token;
  });

  test('should be possible take the user with token', async () => {
    if (!token) throw new Error('No token');

    const { body } = await request(app).get('/user')
      .set('Authorization', token)
      .expect(200);

    expect(typeof body.id).toBe('number');
    expect(body.name).toBe(user.name);
    expect(body.email).toEqual(email);
  });

  test('should give back an message if token is invalid', async () => {
    if (!token) throw new Error('No token');
    await request(app).get('/user')
      .expect(401, { message: 'autenticacao invalido' });
  });

  test('should give back an message if token no token', async () => {
    if (!token) throw new Error('No token');
    await request(app).get('/user')
      .expect(401, { message: 'autenticacao invalido' });
  });

  test('should give back an message if token no token', async () => {
    if (!token) throw new Error('No token');
    await request(app).get('/user')
      .expect(401, { message: 'autenticacao invalido' });
  });
});

describe('products getAll', () => {
  let server;
  beforeAll(async () => {
    await restartDb();
    server = app.listen(4000);
  });

  afterAll(async (done) => {
    await closeTestDB(server);

    return server && server.close(done);
  });

  test('get products', async () => {
    const { body } = await request(app).post('/user')
      .send({
        email: 'user@email.com',
        name: 'Nome Qualquer',
        password: '123456',
        role: true,
      })
      .set('Accept', 'application/json')
      .expect(201);

    const { token } = body;
    expect(token).not.toBeUndefined();

    await request(app).get('/products')
      .set('Authorization', token)
      .expect(200);
  });
});

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

const productsIdInvalid = [{
  name: 'Skol Lata 250ml',
  price: 2.20,
  urlImage: 'http://localhost:3001/images/Skol Lata 350ml.jpg',
  sellingQnt: 10,
}];

const productsQntInvalid = [{
  id: '1',
  name: 'Skol Lata 250ml',
  price: 2.20,
  urlImage: 'http://localhost:3001/images/Skol Lata 350ml.jpg',
}];

describe('sale getAll', () => {
  let token;
  let server;
  beforeAll(async () => {
    await restartDb();
    server = app.listen(4000);
  });

  afterAll(async (done) => {
    await closeTestDB(server);

    return server && server.close(done);
  });
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

  test('create successful sale', async () => {
    expect(token).not.toBeUndefined();
    await request(app).post('/sales')
      .send({ totalPrice, deliveryAddress, deliveryNumber, products })
      .set('Authorization', token)
      .expect({ message: 'Venda processada!' });
  });

  test('create failed sale', async () => {
    expect(token).not.toBeUndefined();
    await request(app).post('/sales')
      .send({ deliveryAddress, deliveryNumber, products })
      .set('Authorization', token)
      .expect({ message: 'preço total inválido' });
  });

  test('create failed sale', async () => {
    expect(token).not.toBeUndefined();
    await request(app).post('/sales')
      .send({ totalPrice, deliveryNumber, products })
      .set('Authorization', token)
      .expect({ message: 'endereço necessário' });
  });

  test('create failed sale', async () => {
    expect(token).not.toBeUndefined();
    await request(app).post('/sales')
      .send({ totalPrice, deliveryAddress, deliveryNumber, products: productsIdInvalid })
      .set('Authorization', token)
      .expect({ message: 'product id inválido' });
  });

  test('create failed sale', async () => {
    expect(token).not.toBeUndefined();
    await request(app).post('/sales')
      .send({ totalPrice, deliveryAddress, deliveryNumber, products: productsQntInvalid })
      .set('Authorization', token)
      .expect({ message: 'quantidade inválida' });
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

    const { id } = JSON.parse(getSale.res.text).sales[0];

    await request(app).get(`/sales/${id}`)
      .set('Authorization', token)
      .expect(200);
  });

  test('update sale', async () => {
    expect(token).not.toBeUndefined();

    const getSale = await request(app).get('/sales')
      .set('Authorization', token)
      .expect(200);

    const { id } = JSON.parse(getSale.res.text).sales[0];

    await request(app).put(`/sales/${id}`)
      .send({ status: 'Entregue' })
      .set('Authorization', token)
      .expect({ message: 'Entregue!' });
  });
});

describe('products getAll', () => {
  let server;
  beforeAll(async () => {
    await restartDb();
    server = app.listen(4000);
  });

  afterAll(async (done) => {
    await closeTestDB(server);

    return server && server.close(done);
  });

  test('get products', async (done) => {
    const { body } = await request(server).post('/user')
      .send({
        email: 'user@email.com',
        name: 'Nome Qualquer',
        password: '123456',
        role: true,
      })
      .set('Accept', 'application/json')
      .expect(201);

    done();
    const { token } = body;
    expect(token).not.toBeUndefined();
    done();
    await request(server).get('/products')
      .set('Authorization', token)
      .expect(200);

    done();
  });
});
