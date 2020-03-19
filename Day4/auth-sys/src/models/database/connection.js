const { Pool } = require('pg');
require('dotenv').config();
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('The Connection not Found');
}

const option = {
  connectionString,
  ssl: !connectionString.includes('localhost')
};

module.exports = new Pool(option);
