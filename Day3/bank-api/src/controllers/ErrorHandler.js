const error404 = (req, res) => {
  res.send('404 not found');
};

const error500 = (err, req, res, next) => {
  res.send('500 internal Error');
};

module.exports = { error404, error500 };
