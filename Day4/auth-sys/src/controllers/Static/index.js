const staticRouter = require('express').Router();

const pages = require('./getStatic');

const authentection = require('./../../middleware/isAuth');

staticRouter.route('/registration').get(pages.registrationPage);
staticRouter.route('/me').get(authentection, pages.profilePage);

module.exports = staticRouter;
