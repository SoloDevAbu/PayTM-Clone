const { Router } = require('express');
const router = Router();
const userRouter = require('./user/user.route')
const accountRouter = require('./account/account.route');

router.use('/user', userRouter);
router.use('/account', accountRouter);

module.exports = router;