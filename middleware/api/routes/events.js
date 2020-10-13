const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/event');

router.get('/', (req, res, next) => {
  Event.find()
    .select('_id artist_ids eventdatetime venuename venuephone eventlinks')
    .exec()
    .then(docs =>{
      const response = {
        count: docs.length,
        Event: docs.map(doc=>{
          return{
            _id: doc._id,
            artist_ids: doc.artist_ids,
            eventdatetime: doc.eventdatetime,
            venuename: doc.venuename,
            venuephone: doc.venuephone,
            eventlinks: doc.eventlinks,
            request: {
              type: 'GET PATCH',
              eventurl: 'http://'+req.headers.host+'/events'+doc._id
            }
          }
        })
      };
      (docs.length > 0) ? res.status(200).json(response) : res.status(204).json({message: 'No events currently listed'});
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

router.post('/', (req, res, next) => {
  let eventdatetime = req.body.eventdatetime;
  let venuename = req.body.venuename;
  let venuephone = req.body.venuephone;
  let eventlinks = req.body.eventlinks;
  let results = {
    message: "Handling POST request with userID",
    eventdatetime: eventdatetime,
    venuename: venuename,
    venuephone: venuephone,
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
