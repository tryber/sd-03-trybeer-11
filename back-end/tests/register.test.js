const mysqlx = require('@mysql/xdevapi');
const frisby = require('frisby');
const Joi = frisby.Joi;
require('dotenv/config');

const {
  HOST,
  USER_MYSQL,
  PASSWORD,
  PORT_DB,
  PORT,
} = process.env;

const config = {
  host: HOST,
  user: USER_MYSQL,
  password: PASSWORD,
  port: PORT_DB,
};

const URL_BASE = `http://localhost:${PORT}`;

describe('register', () => {
  const nameError = 'pelo menos 12 caracteres, não pode conter numeros nem caracteres especiais';
  const emailError = 'email tem que ser no formato <nome@dominio>';
  const passwordError = 'senha de pelo menos 6 digitos';
  const lessInfoError = 'Faltando informacoes';
  const emailDuplicatedError = 'email ja existe';
  let conn;
  let db;

  beforeAll(async () => {
    conn = await mysqlx.getSession(config);
    db = await conn.getSchema('Trybeer');
    const table = await db.getTable('users');
    await table.delete().where('TRUE').execute();
  });

  afterAll(() => {
    conn.close();
  });

  afterEach(async () => {
    const table = await db.getTable('users');
    await table.delete().where('TRUE').execute();
  });

  test('Is possible create an commom user', async () => {
    const user = {
      name: 'exampleGrande',
      email: 'example@example.com',
      password: '123456',
      role: false,
    };

    await frisby.post(`${URL_BASE}/user`, user)
      .expect('status', 201)
      .expect('jsonTypes', {
        id: Joi.number().required(),
        email: 'example@example.com',
        token: Joi.string().required(),
        name: 'exampleGrande',
        role: 'client',
      });
  });

  test('Name should have at least 12 characters', async () => {
    const user = {
      name: 'abcdefghijk',
      email: 'example@example.com',
      password: 'abcdef',
      role: 'false',
    };

    await frisby.post(`${URL_BASE}/user`, user)
      .expect('status', 422)
      .expect('jsonTypes', {
        message: nameError,
      });
  });

  test('Name should not have number', async () => {
    const user = {
      name: 'abcdefghijk123',
      email: 'example@example.com',
      password: 'abcdef',
      role: 'false',
    };

    await frisby.post(`${URL_BASE}/user`, user)
      .expect('status', 422)
      .expect('jsonTypes', {
        message: nameError,
      });
  });

  test('Name should not have special characters', async () => {
    const user = {
      name: 'abcdefghijk@^',
      email: 'example@example.com',
      password: 'abcdef',
      role: 'false',
    };

    await frisby.post(`${URL_BASE}/user`, user)
      .expect('status', 422)
      .expect('json', {
        message: nameError,
      });
  });

  test('email should have the <name>@<dominio> format', (done) => {
    const user = {
      name: 'abcdefghijkl',
      email: 'example@',
      password: 'abcdef',
      role: 'false',
    };

    frisby.post(`${URL_BASE}/user`, user)
      .expect('status', 422)
      .expect('json', {
        message: emailError,
      })
      .then(() => done());
  });

  test('email should not exists', async () => {
    const user = {
      name: 'abcdefghijkl',
      email: 'example@exa.com',
      password: 'abcdef',
      role: 'false',
    };

    const user2 = {
      name: 'mnopqrstuvwxyz',
      email: 'example@exa.com',
      password: 'abcdef',
      role: 'false',
    };

    await frisby.post(`${URL_BASE}/user`, user)
      .expect('status', 200)
    
    await frisby.post(`${URL_BASE}/user`, user)
  });
});
