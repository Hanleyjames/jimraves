const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password:  hash
      });
      user
        .save()
        .then(result => {
          console.log(result);
          res.status(200).json({
            message: 'User Created'
          });
        })
        .catch(err=>{
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    };
  });

});


/*
router.get('/', (req, res, next) => {
  let results = { //replace with db calls later
    message: "Handling GET request"
  };
  res.status(200).json(results);
});

router.post('/', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let artistname = req.body.email;
  let results = {
    message: "Handling POST request with userID",
    user_name: username,
    password: password,
    email: email,
    artistname: artistname
  };
  res.status(204).json(results);
});

router.get('/:userID', (req, res, next) => {
  let id = req.params.userID;
  let results = {
    message: "Handling GET request with parameters",
    id: id
  };
  res.status(200).json(results);
});

router.patch('/:userID', (req, res, next) => {
  let id = req.params.userID;
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let artistname = req.body.email;
  let results = {
    message: "Handling POST request with parameters",
    id: id,
    user_name: username,
    password: password,
    email: email,
    artistname: artistname
  };
  res.status(201).json(results);
});

router.delete('/:userID', (req, res, next) => {
  let id = req.params.userID;
  let results = {
    message: "Handling DELETE request with parameters",
    id: id
  };
  res.status(204).json(results);
});
*/
module.exports = router;
