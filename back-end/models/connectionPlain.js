require('dotenv/config');
const mysqlx = require('@mysql/xdevapi');

const { HOSTNAME, MYSQL_USER, MYSQL_PASSWORD, PORT_DB = 33060 } = process.env;

module.exports = () => mysqlx
  .getSession({
    host: HOSTNAME,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    port: PORT_DB,
    socketPath: '/var/run/mysqld/mysqld.sock',
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
