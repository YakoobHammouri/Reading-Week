const { join } = require('path');
const { readFileSync } = require('fs');

const connection = require('../connection');

const sql = readFileSync(join(__dirname, 'build.sql')).toString();
const dummyDate = readFileSync(join(__dirname, 'dummyData.sql')).toString();

connection
  .query(sql)
  .then(res => {
    console.log('create Database');
    connection
      .query(dummyDate)
      .then(res => {
        console.log('Create Data');
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
