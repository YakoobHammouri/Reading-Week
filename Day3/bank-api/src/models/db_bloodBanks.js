const connection = require('./Database/connection');

const getAllBloodBanks = () => {
  const sql =
    'select b.id as bankId , b.name as bankName , b.city as bankCity , b.contact_number as  bankphone , d.name as nameDonor, d.blood_group , d.contact_number as donorPhone from blood_banks b join donors d on d.id = b.doner_id;';
  return connection.query(sql);
};

const insertbloodBank = data => {
  const sql = {
    text:
      'INSERT INTO blood_banks (name , city ,contact_number ,doner_id ) VALUES ($1 , $2 , $3 , $4);',
    values: [data.name, data.city, data.phone, data.donerId]
  };
  console.log('start insert', sql);
  return connection.query(sql.text, sql.values);
};

module.exports = { insertbloodBank, getAllBloodBanks };
