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
      .inspectJSON()
      .expect('status', 201)
      .expect('jsonTypes', {
        id: Joi.number().required(),
        email: 'example@example.com',
        name: 'exampleGrande',
        role: 'client',
      });
  });
});
