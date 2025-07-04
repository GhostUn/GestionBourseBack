const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateUser } = require('../middlewares/user.validator');
const {connexionConroller} =require('../controllers/auth.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

router.post('/', validateUser, userController.createUser);
router.put('/:id', validateUser, authenticateToken,userController.updateUser);

router.get('/', userController.getUsers);
router.get('/:id',validateUser, authenticateToken, userController.getUserById);
router.delete('/:id',validateUser,authenticateToken, userController.deleteUser);


module.exports = router;
