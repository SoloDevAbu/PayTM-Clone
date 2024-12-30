const { Router } = require('express');
const { createUser, getUser, updateUser } = require('../../controller/user.controller');
const router = Router();

router.post('/signup', createUser);
router.get('/login', getUser);
router.put('/update', updateUser);

module.exports = router;