const userRouter = require('express').Router();
const registration = require('./registration');

const checkEmailExist = require('./../../middleware/CheckEmailExist');

userRouter.route('/registration').post(checkEmailExist, registration);

module.exports = userRouter;
