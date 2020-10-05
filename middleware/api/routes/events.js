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
  let eventdatetime = req.body.eventdatetime;
  let venuename = req.body.venuename;
  let venuenumber = req.body.venuephonenumber;
  let eventlinks = req.body.eventlinks;
  let results = {
    message: "Handling POST request with userID",
    eventdatetime: eventdatetime,
    venuename: venuename,
    venuenumber: venuenumber,
    eventlinks: eventlinks
  };
  res.status(204).json(results);
});

router.get('/:eventID', (req, res, next) => {
  let id = req.params.eventID;
  let results = {
    message: "Handling GET request with parameters",
    id: id
  };
  res.status(200).json(results);
});

router.patch('/:eventID', (req, res, next) => {
  let id = req.params.eventID;
  let eventdatetime = req.body.eventdatetime;
  let venuename = req.body.venuename;
  let venuenumber = req.body.venuephonenumber;
  let eventlinks = req.body.eventlinks;
  let results = {
    message: "Handling POST request with parameters",
    id: id,
    eventdatetime: eventdatetime,
    venuename: venuename,
    venuenumber: venuenumber,
    eventlinks: eventlinks
  };
  res.status(201).json(results);
});

router.delete('/:eventID', (req, res, next) => {
  let id = req.params.eventID;
  let results = {
    message: "Handling DELETE request with parameters",
    id: id
  };
  res.status(204).json(results);
});

module.exports = router;
