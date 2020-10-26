const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth =  require('../middleware/checkauth');
const ArtistController = require("../controllers/artists");

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

//Import artist model
const Artist = require('../models/artist');

router.get('/', ArtistController.get_all_artists);

router.post('/', checkAuth, ArtistController.create_new_artist);

router.get('/:artistID', ArtistController.get_single_artist);

router.patch('/:artistID', checkAuth, ArtistController.update_artist);

router.delete('/:artistID', checkAuth, ArtistController.delete_artist);

module.exports = router;
