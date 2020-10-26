const mongoose = require('mongoose');
const multer = require('multer');
const Artist = require('../models/artist');
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
