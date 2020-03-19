const bcrypt = require('bcrypt');
const connection = require('../database/connection');
const queryText = require('../database/queryText');

const insertUser = async (data) => {
  const hashpassword = await bcrypt.hash(data.password, 10);
  const role = !data.role ? 'user' : data.role;
  const sql = {
    text: queryText.insertUserText,
    values: [data.gid, data.name, data.email, data.phone, role, hashpassword],
  };

  return connection.query(sql.text, sql.values);
};

const getUserByEmail = (email) => {
  const sql = {
    text: queryText.getUserByEmailText,
    values: [email],
  };
  return connection.query(sql.text, sql.values);
};

const getUserByGID = (gid) => {
  const sql = {
    text: queryText.getUuserByGIDText,
    values: [gid],
  };
  return connection.query(sql.text, sql.values);
};

module.exports = { insertUser, getUserByEmail, getUserByGID };
