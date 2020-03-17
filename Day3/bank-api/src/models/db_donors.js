const connection = require('./Database/connection');

const getAllDonors = () => {
  const sql = 'select * from donors;';
  return connection.query(sql);
};

const insertDonor = data => {
  const sql = {
    text:
      'INSERT INTO donors (name , blood_group ,contact_number ) VALUES  ($1 , $2 , $3)',
    values: [data.name, data.bloodGroup, data.phone]
  };
  return connection.query(sql.text, sql.values);
};

const getDonorById = id => {
  const Sql = {
    text: 'select * from donors where id = $1;',
    values: [id]
  };
  return connection.query(sql.text, sql.values);
};

module.exports = { getAllDonors, insertDonor };
