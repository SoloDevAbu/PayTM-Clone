const { Router } = require('express');
const { createUser, getUser, updateUser, getUserOnSearch } = require('../../controller/user.controller');
const authMiddleware = require('../../middleware/user.middleware');
const router = Router();

router.post('/signup', createUser);
router.get('/login', getUser);
router.put('/update', authMiddleware, updateUser);
router.get('/bulk', getUserOnSearch);

module.exports = router;