const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectID,
  artist_names: String,
  eventname: String,
  eventdate:{ type: Date, default: Date.now()},
  eventtime: String,
  venuename: String,
  venuephone: String,
  eventlinks: [String]
});
module.exports = mongoose.model('Event', eventSchema);
