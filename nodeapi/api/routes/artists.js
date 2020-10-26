const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth =  require('../middleware/checkauth');
const ArtistController = require("../controllers/artists");

router.get('/', ArtistController.get_all_artists);

router.post('/', checkAuth, ArtistController.create_new_artist);

router.get('/:artistID', ArtistController.get_single_artist);

router.patch('/:artistID', checkAuth, ArtistController.update_artist);

router.delete('/:artistID', checkAuth, ArtistController.delete_artist);

module.exports = router;
