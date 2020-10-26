const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// import controller methods
const UserController = require('../controllers/users');
//import authorization middleware
const checkAuth =  require('../middleware/checkauth');


router.post("/signup", UserController.create_user);

router.post('/login', UserController.login_user);

router.delete('/:userId', checkAuth, UserController.delete_user);


module.exports = router;
