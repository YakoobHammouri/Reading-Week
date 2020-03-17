const { patients } = require('../models');

const getPatient = (req, res, next) => {
  patients
    .getAllPatients()
    .then(data => res.json(data.rows))
    .catch(err => {
      console.log(err);
      next(err);
    });
};

const InsertPatient = (req, res, next) => {
  const data = req.body ? req.body : null;
  if (!data) {
    res.send('Error in send Data');
    return;
  }
  patients
    .insertPatient(req.body)
    .then(data => res.json(data.rowCount))
    .catch(err => {
      next(err);
    });
};

module.exports = { InsertPatient, getPatient };
