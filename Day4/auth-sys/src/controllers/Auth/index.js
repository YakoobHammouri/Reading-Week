const authRouter = require('express').Router();

const login = require('./login');
const logout = require('./logout');

authRouter.route('/logout').post(logout);
authRouter.route('/login').post(login);

module.exports = authRouter;
