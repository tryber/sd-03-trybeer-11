require('dotenv/config');
const mysqlx = require('@mysql/xdevapi');

const {
  HOSTNAME,
  MYSQL_USER,
  MYSQL_PASSWORD,
  PORT_DB,
  PORT,
} = process.env;

const config = {
  host: HOSTNAME,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  port: PORT_DB,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

const URL_BASE = `http://localhost:${PORT}`;

let conn;

const eraseDB = async () => {
  conn = await mysqlx.getSession(config);
  const db = await conn.getSchema('Trybeer');
  await db.getTable('sales').delete()
    .where('TRUE')
    .execute();
  await db.getTable('sales_products').delete()
    .where('TRUE')
    .execute();
  await db.getTable('users').delete()
    .where('TRUE')
    .execute();
  return [conn, db];
};

const closeDB = async () => conn.close();

module.exports = {
  eraseDB,
  URL_BASE,
  closeDB,
};
