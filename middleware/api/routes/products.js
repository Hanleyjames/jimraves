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
  let results = {
    message: "Handling POST request"
  };
  res.status(204).json(results);
});

router.get('/:itemID', (req, res, next) => {
  let id = req.params.itemID;
  let results = {
    message: "Handling GET request with parameters",
    id: id
  };
  res.status(200).json(results);
});

router.patch('/:itemID', (req, res, next) => {
  let id = req.params.itemID;
  let results = {
    message: "Handling POST request with parameters",
    id: id
  };
  res.status(201).json(results);
});

router.delete('/:itemID', (req, res, next) => {
  let id = req.params.itemID;
  let results = {
    message: "Handling DELETE request with parameters",
    id: id
  };
  res.status(204).json(results);
});

module.exports = router;
