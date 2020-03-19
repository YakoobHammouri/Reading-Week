const router = require('express').Router();

const staticRouter = require('./Static');
const userRouter = require('./User');
const authRouter = require('./Auth');

router.use(staticRouter);
router.use(userRouter);
router.use(authRouter);

module.exports = router;
