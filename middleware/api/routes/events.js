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
              type: 'GET PATCH DELETE',
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
  let artist_ids = req.body.artist_ids;
  let event = new Event({
    _id: new mongoose.Types.ObjectID(),
    artist_ids: artist_ids,
    venuename: venuename,
    venuephone: venuephone,
    eventlinks: eventlinks,
    eventdatetime: eventdatetime
  });
  event
    .save()
    .then(result => {
      res.status(201).json({
        message: "Event Creation Successful",
        createdEvent: {
          _id: result._id,
          artist_ids: result.artist_ids,
          venuename: result.venuename,
          venuephone: result.venuephone,
          eventlinks: result.eventlinks,
          eventdatetime: results.eventdatetime
        }
      })
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:eventID', (req, res, next) => {
  let id = req.params.eventID;
  Event.findbyId(id)
    .select('_id artist_ids venuename venuephone eventlinks eventdatetime')
    .exec()
    .then(doc => {
      (doc) ? res.status(200).json(doc) : res.status(404).json({message: "Event not found", event_id: id});
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({error: err});
    });
});

router.patch('/:eventID', (req, res, next) => {
  let id = req.params.eventID;
  let updateOps = {};
  for(let ops of req.body){
    updateOps[ops.propName] = ops.value;
  }
  Event.update({_id: id}, { $set: updateOps })
    .select('_id artist_ids venuename venuephone eventlinks eventdatetime')
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

router.delete('/:eventID', (req, res, next) => {
  let id = req.params.eventID;
  Event.deleteOne({_id: id})
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
