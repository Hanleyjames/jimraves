const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//Import bcrypt for hasing and salting the password body request
const bcrypt = require('bcrypt');
// import jsonwebtoken
const jwt = require('jsonwebtoken');
// import user model
const User = require('../models/user');
// import controller methods
const UserController = require('../controllers/users');
//import authorization middleware
const checkAuth =  require('../middleware/checkauth');


router.post("/signup", UserController.create_user);

router.post('/login', UserController.login_user);

router.delete('/:userId', checkAuth, UserController.delete_user);


module.exports = router;
