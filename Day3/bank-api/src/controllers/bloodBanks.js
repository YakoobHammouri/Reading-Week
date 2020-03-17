const { bloodBanks } = require('./../models');

const getAllBloodBank = (req, res, next) => {
  bloodBanks
    .getAllBloodBanks()
    .then(data => res.json(data.rows))
    .catch(err => next(err));
};

const InsertBloodBank = (req, res, next) => {
  const data = req.body ? req.body : null;
  if (!data) {
    res.send('Error in send Data');
    return;
  }
  bloodBanks
    .insertbloodBank(data)
    .then(result => res.json(result.rowCount))
    .catch(err => {
      console.log(err);
      next(err);
    });
};

module.exports = { getAllBloodBank, InsertBloodBank };
