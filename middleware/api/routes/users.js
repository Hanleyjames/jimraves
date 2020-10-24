const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//Import bcrypt for hasing and salting the password body request
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post("/signup", (req, res, next) => {
  //Find the user by the email
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      //If the user exists in the database, return a status of 409
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email in use"
        });
      } else {
        //hash and salt the password, return status 500 if error or create
        //a new user object with the hashed password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            //Call the save method and store the result in the json object or
            //return a status of 500 with the error.
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});
router.delete('/:userId', (req, res, next) => {
  //Get and set the id from the request parameters
  let id = req.params.userId;
  //call the deleteOne method on the Artist constructor and pass the id in the field
  User.deleteOne({_id: id})
    .exec()
    //If the results are successful return status code 200 or log the error and return status code 500
    .then(result => {
      res.status(200).json({message: "User Deleted"});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});


module.exports = router;
