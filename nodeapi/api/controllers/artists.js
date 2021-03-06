const mongoose = require('mongoose');
//Import multer for parting and storing files for artists
const multer = require('multer');
const Artist = require('../models/artist');
//Create storage which takes a destination from the root as uploads and
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, + new Date().toISOString() + file.originalname );
  },
});

const upload = multer({
  storage: storage,
  limits: {filesize: 1024 * 1024 * 10},

});

exports.get_all_artists = (req, res, next) => {
  Artist.find()
    //Filter mongo fields
    .select('_id artistname artistpicture')
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
            request: {
              type: 'GET',//Write array of Methods GET DELETE PATCH
              artisturl: 'http://'+req.headers.host+'/artists/' + doc._id
            }
          }
        })
      };
      //If the document length is greater than 0, respond with 200 and the list of artists, else, reply with a 204 status code.
      (docs.length > 0) ? res.status(200).json(response) : res.status(204).json({message: 'No artists Available'});
    })
    .catch(err => {
      console.log(err);
      //return server error
      res.status(500).json({
        error: err
      })
    });
};

exports.create_new_artist = upload.single('artistpicture'), (req, res, next) => {
  //Parameters from the request body
  console.log(req.file);
  let artistsname = req.body.artistname;
  let artistspicture = req.file.path;
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
};

exports.get_single_artist = (req, res, next) => {
  //Set id = the parameter
  let id = req.params.artistID;
  //Call the findByID method on the Artist constructor
  Artist.findById(id)
    .select('_id artistname artistpicture artistbio artistlinks artistdocs')
    .exec()
    .then(doc => {
      //If the document exists return the document with status code 200, or
      // return 404 with a message about the missing document
      (doc) ? res.status(200).json(doc) : res.status(404).json({message: "Artist not found", id: id});
    })
    //If there is an error in the response, return status code 500 and a json
    //object of the error
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
};
/*
exports.get_single_artist = (req, res, next) => {
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
}*/
exports.update_artist = (req, res, next) => {
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
};

exports.delete_artist =(req, res, next) => {
  //Get and set the id from the request parameters
  let id = req.params.artistID;
  //call the deleteOne method on the Artist constructor and pass the id in the field
  Artist.deleteOne({_id: id})
    .exec()
    //If the results are successful return status code 200 or log the error and return status code 500
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
};
