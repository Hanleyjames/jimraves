const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Import artist model
const Artist = require('../models/artist');

router.get('/', (req, res, next) => {
  Artist.find()
    //Filter mongo fields
    .select('_id artistname artistpicture artistbio artistlinks artistdocs')
    .exec()
    .then(docs =>{
      //This creates a response with metadata for the retreived documents in the collection
      const response = {
        count: docs.length,
        Artists: docs.map(doc =>{
          return{
            _id: doc._id,
            artistname: doc.artistname,
            artistpicture: doc.artistpicture,
            artistbio: doc.artistbio,
            artistlinks: doc.artistlinks,
            artistdocs: doc.artistdocs,
            request: {
              type: 'GET',
              artisturl: 'http://'+req.headers.host+'/artists/' + doc._id
            }
          }
        })
      };
      if(docs.length > 0){
        //Return the response with status of 200 if length of the artists are over 0
        res.status(200).json(response);
      }else{
        //Return status 204 and a json response with an explenation
        res.status(204).json({
          message: 'No Artists Available'
        });
      }
    })
    .catch(err => {
      console.log(err);
      //return server error
      res.status(500).json({
        error: err
      })
    });
});

router.post('/', (req, res, next) => {
  //Parameters from the request body
  let artistsname = req.body.artistname;
  let artistspicture = req.body.artistpicture;
  let artistsbio = req.body.artistbio;
  let artistslinks = req.body.artistlinks;
  let artistsdocs = req.body.artistdocs;
  //Instantiate new artist object using artist constructor
  let artist = new Artist({
    _id: new mongoose.Types.ObjectId(),
    artistname: artistsname,
    artistpicture: artistspicture,
    artistbio: artistsbio,
    artistlinks: artistslinks,
    artistdocs: artistsdocs
  });
  //Attempt to save the new artist object in the database
  artist
    .save()
    .then(result => {
      //return status code 201 with a json object containing it's results
      res.status(201).json({
        message: "Artist Creation Successful",
        createdArtist: {
          _id: result._id,
          artistname: result.artistname,
          artistpicture: result.artistpicture,
          artistbio: result.artistbio,
          artistlinks: result.artistlinks,
          artistdocs: result.artistdocs,
          request: {
            type: 'GET',
            artisturl: 'http://'+req.headers.host+'/artists/' + result._id
          }
        }
      })
    })
    //If the save is unsuccessful, respond with a status code 500 (server error)
    //and a json object with the error.
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:artistID', (req, res, next) => {
  //Set id = the parameter
  let id = req.params.artistID;
  //Call the findByID method on the Artist constructor
  Artist.findById(id)
    .select('_id artistname artistpicture artistbio artistlinks artistdocs')
    .exec()
    .then(doc => {
      //If the document exists return the document with status code 200, or
      // return 404 with a message about the missing document
      if(doc){
        res.status(200).json(doc);
      }else{
        res.status(404).json({
          message: "Artist not found",
          id: id
        })
      }
    })
    //If there is an error in the response, return status code 500 and a json
    //object of the error
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

router.patch('/:artistID', (req, res, next) => {
  //Get and set the id from the parameters
  let id = req.params.artistID;
  //Create an update array
  let updateOps = {};
  //for each request body object get its propertyName and its associate value
  //store them in an array, to only update objects that need to be updates.
  for(let ops of req.body){
    updateOps[ops.propName] = ops.value;
  }
  //Call the update method on the artist constructure, find the artist by id and
  //pass the updateOperations array to the update function.
  Artist.update({_id: id}, { $set: updateOps})
    .select('_id artistname artistpicture artistbio artistlinks artistdocs')
    .exec()
    //Return the results with a status code of 200
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    //if there's an error return the status code 500 (server error) with a json
    //object of that error
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

router.delete('/:artistID', (req, res, next) => {
  let id = req.params.artistID;
  Artist.deleteOne({_id: id})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

module.exports = router;
