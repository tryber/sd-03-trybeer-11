require('dotenv/config');
const mysqlx = require('@mysql/xdevapi');

let schema;

const { HOSTNAME, MYSQL_USER, MYSQL_PASSWORD, PORT_DB = 33060, DB_NAME = 'Trybeer' } = process.env;

module.exports = () => {
  if (schema) return Promise.resolve(schema);
  return mysqlx
    .getSession({
      host: HOSTNAME,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      port: PORT_DB,
      socketPath: '/var/run/mysqld/mysqld.sock',
    })
    .then(async (session) => {
      schema = await session.getSchema(DB_NAME);
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
