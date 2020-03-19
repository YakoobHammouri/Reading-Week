const userRouter = require('express').Router();
const registration = require('./registration');

userRouter.route('/registration').post(registration);

module.exports = userRouter;
