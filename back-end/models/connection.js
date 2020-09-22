require('dotenv/config');
const mysqlx = require('@mysql/xdevapi');

let schema;

const { HOST, USER, PASSWORD, PORT_DB } = process.env;

module.exports = () => {
  if (schema) return Promise.resolve(schema);
  return mysqlx
    .getSession({
      host: HOST,
      user: USER,
      password: PASSWORD,
      port: PORT_DB,
      socketPath: '/var/run/mysqld/mysqld.sock',
    })
    .then(async (session) => {
      schema = await session.getSchema('trybeer');
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
