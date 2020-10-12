const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Artist = require('../models/artist');

router.get('/', (req, res, next) => {
  Artist.find()
    .exec()
    .then(docs =>{
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

router.post('/', (req, res, next) => {
  let artistsname = req.body.artistname;
  let artistspicture = req.body.artistpicture;
  let artistsbio = req.body.artistbio;
  let artistslinks = req.body.artistlinks;
  let artistsdocs = req.body.artistdocs;
  let artist = new Artist({
    _id: new mongoose.Types.ObjectId(),
    artistname: artistsname,
    artistpicture: artistspicture,
    artistbio: artistsbio,
    artistlinks: artistslinks,
    artistdocs: artistsdocs
  });
  artist
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Artist Creation Successful",
        createdProduct: result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:artistID', (req, res, next) => {
  let id = req.params.artistID;
  Artist.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if(doc){
        res.status(200).json(doc);
      }else{
        res.status(404).json({
          message: "Artist object not found",
          id: id
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

router.patch('/:artistID', (req, res, next) => {
  let id = req.params.artistID;
  let artistname = req.body.artistname;
  let artistpicture = req.body.artistpicture;
  let artistbio = req.body.artistpicture;
  let artistlinks = req.body.artistlinks;
  let artistdocs = req.body.artistdocs;
  let results = {
    message: "Handling POST request with parameters",
    id: id
  };
  res.status(201).json(results);
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
