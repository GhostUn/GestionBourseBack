const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth.controller');
const {validateUser} = require('../middlewares/auth.validator')


router.post('/', validateUser,login);


module.exports = router;
