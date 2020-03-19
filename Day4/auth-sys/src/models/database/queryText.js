const userTable = 'users';
module.exports = {
  insertUserText: `INSERT INTO ${userTable} (gid , name , email , phone , role , password) VALUES ($1,$2,$3,$4,$5,$6)`,
  getUserByEmailText: `SELECT * FROM ${userTable} WHERE email = $1 `,
  getUuserByGIDText: `SELECT * FROM ${userTable} WHERE gid = $1 `,
};
