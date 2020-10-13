const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectID,
  artist_ids: [mongoose.Schema.Types.ObjectID],
  eventdatetime: DateTime,
  venuename: String,
  venuephone: String,
  eventlinks: [String]
});
module.exports = mongoose.model('Event', eventSchema);
