const userRouter = require('express').Router();
const registration = require('./registration');
const userProfile = require('./getUserProfile');

const checkEmailExist = require('../../middleware/checkEmailExist');
const authentcation = require('../../middleware/isAuth');

userRouter.route('/registration').post(checkEmailExist, registration);
userRouter.route('/userProfile').get(authentcation, userProfile);

module.exports = userRouter;
