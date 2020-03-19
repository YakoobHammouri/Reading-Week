require('dotenv').config();

const jwt = require('jsonwebtoken');

const convereter = require('./converter');

const generateToken = (gid, data) => {
  const payload = {};
  if (gid) {
    // gid not undefiend and not null
    payload.id = convereter.EnCode(gid);
  }

  if (data) {
    payload.info = data;
  }
  return jwt.sign(payload, process.env.acces_Token_secret);
};

module.exports = generateToken;
