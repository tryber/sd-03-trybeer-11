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

module.exports = {
  getUserByEmail,
  createUser,
};
