const { verify } = require('jsonwebtoken');
const { SECRET } = process.env;

const isAuth = (req, res, next) => {
  const token = !req.cookies ? null : req.cookies.token;
  if (!token) {
    return res.status(401).redirect('/');
  }
  verify(token, process.env.acces_Token_secret, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .clearCookie('token')
        .json({
          status: 'error',
          message: 'unauthorised'
        });
    }
    req.user = decoded;
    next();
  });
};

module.exports = isAuth;
