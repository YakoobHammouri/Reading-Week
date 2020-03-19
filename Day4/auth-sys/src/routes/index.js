const staticRouter = require('express').Router();
const userRouter = require('express').Router();
const authRouter = require('express').Router();

const router = require('../controllers');

staticRouter.use('/', router);
userRouter.use('/api/user/', router);
authRouter.use('/auth/user/', router);

module.exports = { staticRouter, userRouter, authRouter };
