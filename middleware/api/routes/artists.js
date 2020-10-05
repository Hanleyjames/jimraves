const express = require('express');
const router = express.Router();
//const db = require('dbconnectorlocationpath');

router.get('/', (req, res, next) => {
  let results = { //replace with db calls later
    message: "Handling GET request"
  };
  res.status(200).json(results);
});

router.post('/', (req, res, next) => {
  let userID = req.body.userID;
  let results = {
    message: "Handling POST request with userID",
    user_id: userID
  };
  res.status(204).json(results);
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
