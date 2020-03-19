const authRouter = require('express').Router();

const logout = require('./logout');

authRouter.route('/logout').post(logout);

module.exports = authRouter;
