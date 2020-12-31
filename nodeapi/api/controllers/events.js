const mongoose = require('mongoose');
const Event = require('../models/event');
const Artist = require('../models/artist');

exports.get_all_events = (req, res, next) => {
  Event.find()
    .select('_id artist_names eventname eventdate eventtime')
    .exec()
    .then(docs => {
      const response ={
        count: docs.length,
        Events: docs.map(doc =>{
          return{
            _id: doc._id,
            artist_names: doc.artist_names,
            eventname: doc.eventname,
            eventdate: doc.eventdate,
            eventtime: doc.eventtime,
            request:{
              type: 'GET PATCH DELETE',
              eventurl: 'http://'+req.headers.host+'/events/'+doc._id
            }
          }
        })
      };
      (docs.length > 0) ? res.status(200).json(response) : res.status(204).json({message: 'No events Available'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
};

exports.create_new_event = (req, res, next) => {
  let artist_names = req.body.artist_names;
  let eventname = req.body.eventname;
  let eventdate = req.body.eventdate;
  let eventtime = req.body.eventtime;
  let venuename = req.body.venuename
  let venuephone = req. body.venuephone;
  let eventlinks = req.body.eventlinks;
  let event = new Event({
    _id: new mongoose.Types.ObjectId(),
    artist_names: artist_names,
    eventname: eventname,
    eventdate: eventdate,
    eventtime: eventtime,
    venuename: venuename,
    venuephone: venuephone,
    eventlinks: eventlinks
  });
  event
    .save()
    .then(result=> {
      res.status(201).json({
        message: "Event Creation Successful",
        createdEvent: {
          _id: result._id,
          artist_names: result.artist_names,
          eventname: result.eventname,
          eventdate: result.eventdate,
          eventtime: result.eventtime,
          venuename: result.venuename,
          venuephone: result.venuephone,
          eventlinks: result.eventlinks,
          request: {
            type: 'GET PATCH DELETE',
            eventurl: 'http://'+req.headers.host+'/events/'+result._id
          }
        }
      })
    })
    .catch(err=> {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get_single_event = (req, res, next) => {
  let id = req.params.eventID;
  Event.findById(id)
    .select('_id artist_names eventname eventdate eventtime venuename venuephone eventlinks')
    .exec()
    .then(doc=> {
      (doc) ? res.status(200).json(doc) : res.status(404).json({message: "Artist not found", id: id});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err})
    });
};

exports.update_event = (req, res, next) => {
  let id = req.params.eventID;
  let updateOps = {};
  for(let ops of req.body){
    updateOps[ops.propName] = ops.value;
  }
  Event.update({_id: id}, { $set: updateOps })
    .select('_id artist_names eventname eventdate eventtime venuename venuephone eventlinks')
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
};

exports.delete_event = (req, res, next) => {
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
};
