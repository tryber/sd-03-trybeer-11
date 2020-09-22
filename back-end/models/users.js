const connection = require("./connection");

const getUserByEmail = async (email) =>
  connection()
    .then((db) => db.getTable("users"))
    .then((table) =>
      table.select().where("email = :email").bind("email", email).execute()
    )
    .then((conn) => conn.fetchAll()[0] || [])
    .then(([id, name, email, password, role]) => ({
      id,
      name,
      email,
      password,
      role,
    }));

module.exports = {
  getUserByEmail,
};
