require('dotenv/config');
const mysqlx = require('@mysql/xdevapi');

const {
  HOSTNAME = 'localhost',
  MYSQL_USER = 'root',
  MYSQL_PASSWORD = 'pass',
  PORT_DB,
} = process.env;

const config = {
  host: HOSTNAME,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  port: PORT_DB,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

const fillProducts = async (db, conn) => {
  await db.getTable('products').delete()
    .where('TRUE')
    .execute();
  await conn.sql(`
    INSERT INTO Trybeer.products (name, price, url_image) VALUES
        ('Skol Lata 250ml',2.20, 'http://localhost:3001/images/Skol Lata 350ml.jpg'),
        ('Heineken 600ml',7.50, 'http://localhost:3001/images/Heineken 600ml.jpg'),
        ('Antarctica Pilsen 300ml',2.49, 'http://localhost:3001/images/Antarctica Pilsen 300ml.jpg'),
        ('Brahma 600ml',7.50, 'http://localhost:3001/images/Brahma 600ml.jpg'),
        ('Skol 269ml',2.19, 'http://localhost:3001/images/Skol 269ml.jpg'),
        ('Skol Beats Senses 313ml',4.49, 'http://localhost:3001/images/Skol Beats Senses 313ml.jpg'),
        ('Becks 330ml',4.99, 'http://localhost:3001/images/Becks 330ml.jpg'),
        ('Brahma Duplo Malte 350ml',2.79, 'http://localhost:3001/images/Brahma Duplo Malte 350ml.jpg'),
        ('Becks 600ml',8.89, 'http://localhost:3001/images/Becks 600ml.jpg'),
        ('Skol Beats Senses 269ml',3.57, 'http://localhost:3001/images/Skol Beats Senses 269ml.jpg'),
        ('Stella Artois 275ml',3.49, 'http://localhost:3001/images/Stella Artois 275ml.jpg');
  `).execute();
};

const eraseDB = async (db, conn) => {
  await db.getTable('sales_products').delete()
    .where('TRUE')
    .execute();
  await db.getTable('sales').delete()
    .where('TRUE')
    .execute();
  await fillProducts(db, conn);
  await db.getTable('users').delete()
    .where('TRUE')
    .execute();
};

const startDBAndErase = async () => {
  const conn = await mysqlx.getSession(config);
  const db = await conn.getSchema('Trybeer');
  return [conn, db];
};

const closeDB = async (db, conn) => {
  await eraseDB(db, conn);
  conn.close();
};

module.exports = {
  eraseDB,
  closeDB,
  startDBAndErase,
};
