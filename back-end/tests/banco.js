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
const fillProducts = async () => {
  const db = await conn.getSchema('Trybeer');
  await db.getTable('products').delete()
    .where('TRUE')
    .execute();
  await conn.sql(`
    INSERT INTO Trybeer.products (id, name, price, url_image) VALUES
        ('1','Skol Lata 250ml',2.20, 'http://localhost:3001/images/Skol Lata 350ml.jpg'),
        ('2','Heineken 600ml',7.50, 'http://localhost:3001/images/Heineken 600ml.jpg'),
        ('3','Antarctica Pilsen 300ml',2.49, 'http://localhost:3001/images/Antarctica Pilsen 300ml.jpg'),
        ('4','Brahma 600ml',7.50, 'http://localhost:3001/images/Brahma 600ml.jpg'),
        ('5','Skol 269ml',2.19, 'http://localhost:3001/images/Skol 269ml.jpg'),
        ('6','Skol Beats Senses 313ml',4.49, 'http://localhost:3001/images/Skol Beats Senses 313ml.jpg'),
        ('7','Becks 330ml',4.99, 'http://localhost:3001/images/Becks 330ml.jpg'),
        ('8','Brahma Duplo Malte 350ml',2.79, 'http://localhost:3001/images/Brahma Duplo Malte 350ml.jpg'),
        ('9','Becks 600ml',8.89, 'http://localhost:3001/images/Becks 600ml.jpg'),
        ('10','Skol Beats Senses 269ml',3.57, 'http://localhost:3001/images/Skol Beats Senses 269ml.jpg'),
        ('11','Stella Artois 275ml',3.49, 'http://localhost:3001/images/Stella Artois 275ml.jpg');
  `).execute();
};
const eraseDB = async () => {
  const db = await conn.getSchema('Trybeer');
  await db.getTable('sales_products').delete()
    .where('TRUE')
    .execute();
  await db.getTable('sales').delete()
    .where('TRUE')
    .execute();
  await fillProducts();
  await db.getTable('users').delete()
    .where('TRUE')
    .execute();
};
const startDBAndErase = async () => {
  conn = await mysqlx.getSession(config);
  const db = await conn.getSchema('Trybeer');
  await eraseDB();
  return [conn, db];
};
const closeDB = async () => conn.close();
module.exports = {
  eraseDB,
  URL_BASE,
  closeDB,
  startDBAndErase,
};
