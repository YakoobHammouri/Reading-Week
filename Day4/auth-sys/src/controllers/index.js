const router = require('express').Router();

const staticRouter = require('./static');
const userRouter = require('./user');
const authRouter = require('./auth');

router.use(staticRouter);
router.use(userRouter);
router.use(authRouter);

module.exports = router;
