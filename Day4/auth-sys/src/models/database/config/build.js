const connection = require('./../connection');
const { join } = require('path');
const { readFileSync } = require('fs');

const sql = readFileSync(join(__dirname, 'build.sql')).toString();

connection
  .query(sql)
  .then(data => console.log('Database Created'))
  .catch(err => {
    console.log(err);
    throw err;
  });
