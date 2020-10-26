const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//Import bcrypt for hasing and salting the password body request
const bcrypt = require('bcrypt');
// import jsonwebtoken
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserController = require('../controllers/users');

router.post("/signup", UserController.create_user);

router.post('/login', (req, res, next) =>{
  //Find the user by the email in the request body
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      //If the does not exist (user with the find command becomes an array)
      //return failed auth
      if(user.length < 1){
        return res.status(401).json({
          message: 'Auth Failed'
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
        //if the password from the request body and the database do not match
        //return failed auth
        if(err){
          return res.status(401).json({
            message: 'Auth Failed'
          });
        }
        //If the results are returned, return the auth message (eventually auth
        // token)
        if(result){
          //const allows the jwt signature to be async, and uses the default
          //algorithm, pass in the email and user id into the payload, followed
          //by the secret key fromt he env variables and the expiration.
          const token = jwt.sign({
            email: user[0].email,
            userId: user[0]._id
          }, process.env.JWT_KEY,

            {
              expiresIn: "1h"
            });
          return res.status(200).json({
            message: 'Auth Success',
            token: token
          });
        }
        //Else just return a 401 with auth failed
        res.status(401).json({
          message: 'Auth Failed'
        });
      })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})

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
