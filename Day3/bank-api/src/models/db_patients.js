const connection = require('./Database/connection');

const getAllPatients = () => {
  const getAllpatientSql = 'select * from patients;';

  return connection.query(getAllpatientSql);
};

const insertPatient = data => {
  const insertpatientSql = {
    text: 'INSERT INTO patients (name , blood_group) VALUES ($1 , $2)',
    values: [data.name, data.bloodGroup]
  };
  return connection.query(insertpatientSql.text, insertpatientSql.values);
};

module.exports = { getAllPatients, insertPatient };
