const mongoose = require('mongoose');
// Schema types found here https://mongoosejs.com/docs/schematypes.html
const artistSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectID,
  artistname: String,
  artistpicture: Schema.Types.Mixed,
  artistbio: String,
  artistlinks: [String],
  artistdocs: [Schema.Types.Mixed]
});
//mongoose.model(internalName, schema);
module.exports = mongoose.model('Artist', artistSchema);
