const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

console.log(connectionString);

if (!connectionString) {
  throw new Error('The Connection String is not found');
}

const option = {
  connectionString,
  ssl: !connectionString.includes('localhost')
};

module.exports = new Pool(option);
