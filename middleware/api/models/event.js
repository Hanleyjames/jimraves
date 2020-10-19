const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectID,
  artist_ids: [{type: mongoose.Schema.Types.ObjectID, ref: 'Artist'}],
  eventdatetime:{ type: Date, default: Date.now()},
  venuename: String,
  venuephone: String,
  eventlinks: [String]
});
module.exports = mongoose.model('Event', eventSchema);
