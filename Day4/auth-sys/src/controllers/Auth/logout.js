const logout = (req, res, next) => {
  res.clearCookie('token');
  res.redirect('/');
};

module.exports = logout;
