const express = require('express');
const router = express.Router();
const UserController= require('../controllers/user.controller');
const { requireAuthentication } = require('../middlewares/authentication.middleware');

router.post('/signup', UserController.createUser);

router.get('/users', requireAuthentication, UserController.getAllUsers);
router.get('/users/:id', requireAuthentication, UserController.getUserById);
router.put('/users/:id', requireAuthentication, UserController.updateUser);
router.delete('/users/:id', requireAuthentication, UserController.deleteUser);

module.exports = router;
