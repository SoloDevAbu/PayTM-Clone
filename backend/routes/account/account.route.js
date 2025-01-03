const { Router } = require('express');
const authMiddleware = require('../../middleware/user.middleware');
const { getbalance, transferBalance } = require('../../controller/account.controller');
const router = Router();

router.get('/balance', authMiddleware, getbalance);
router.post('/transfer', authMiddleware, transferBalance);

module.exports = router;