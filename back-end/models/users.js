const connection = require('./connection');

const getUserByEmail = async (emailToSearch) => connection()
  .then((db) => db.getTable('users'))
  .then((table) => table.select().where('email = :email')
    .bind('email', emailToSearch)
    .execute())
  .then((conn) => conn.fetchAll()[0] || [])
  .then(([id, name, email, password, role]) => ({
    id,
    name,
    email,
    password,
    role,
  }));

const getUserById = async (idToSearch) => connection()
  .then((db) => db.getTable('users'))
  .then((table) => table.select().where('id = :id')
    .bind('id', idToSearch)
    .execute())
  .then((conn) => conn.fetchAll()[0] || [])
  .then(([id, name, email, password, role]) => ({
    id,
    name,
    email,
    password,
    role,
  }));

const createUser = async ({ email, name, password, role }) => connection()
  .then((db) => db.getTable('users'))
  .then((usersTable) => usersTable
    .insert('email', 'name', 'password', 'role')
    .values(email, name, password, role)
    .execute())
  .then((insertion) => ({
    id: insertion.getAutoIncrementValue(),
    email,
    password,
    name,
    role,
  }));

const changeUserNameById = async (id, name) => connection()
  .then((db) => db.getTable('users'))
  .then((table) => table
    .update()
    .set('name', name)
    .where('id = :id')
    .bind('id', id)
    .execute());

const changeUserNameByEmail = async (email, name) => connection()
  .then((db) => db.getTable('users'))
  .then((table) => table
    .update()
    .set('name', name)
    .where('email = :email')
    .bind('email', email)
    .execute());

module.exports = {
  getUserByEmail,
  createUser,
  changeUserNameById,
  changeUserNameByEmail,
  getUserById,
};
