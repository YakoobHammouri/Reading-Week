const { donors } = require('./../models');

const getAlldonrs = (req, res, next) => {
  donors
    .getAllDonors()
    .then(data => res.json(data.rows))
    .catch(err => next(err));
};

const InsertDoner = (req, res, next) => {
  const data = req.body ? req.body : null;
  if (!data) {
    res.send('Error in send Data');
    return;
  }
  donors
    .insertDonor(req.body)
    .then(data => res.json(data.rowCount))
    .catch(err => {
      next(err);
    });
};

module.exports = { getAlldonrs, InsertDoner };
