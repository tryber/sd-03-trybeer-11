const mysqlx = require('@mysql/xdevapi');
const frisby = require('frisby');
const joi = require('joi');
require('dotenv/config');

const {
  HOST,
  USER_MYSQL,
  PASSWORD,
  PORT_DB
} = process.env;

const config = {
  host: HOST,
  user: USER_MYSQL,
  password: PASSWORD,
  port: PORT_DB,
};

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

  test.skip('Is possible create an commom user', async () => {
    await frisby.post('http://localhost:3001', {
      name: 'exampleGrande',
      email: 'example@example',
      password: '123456',
      role: true,
    })
      .expect('status', 201)
      .expect('json', {
        name: 'exampleGrande',
        email: 'example@example',
        password: '123456',
        role: true,
      });
  });
});
