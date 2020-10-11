const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Artist = require('../models/artist');

router.get('/', (req, res, next) => {
  let results = { //replace with db calls later
    message: "Handling GET request"
  };
  res.status(200).json(results);
});

router.post('/', (req, res, next) => {
  let artistsname = req.body.artistname;
  let artistspicture = req.body.artistpicture;
  let artistsbio = req.body.artistbio;
  let artistslinks = req.body.artistlinks;
  let artistsdocs = req.body.artistdocs;
  let artist = new Artist({
    _id: new mongoose.mongo.ObjectID(),
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
    })
    .catch(err => console.log(err));
  let results = {
    message: "POST request for artist creation",
    artist: artist
  };
  res.status(201).json(results);
});

router.get('/:artistID', (req, res, next) => {
  let id = req.params.artistID;
  let results = {
    message: "Handling GET request with parameters",
    id: id
  };
  res.status(200).json(results);
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
  let results = {
    message: "Handling DELETE request with parameters",
    id: id
  };
  res.status(204).json(results);
});

module.exports = router;
