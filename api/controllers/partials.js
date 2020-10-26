const mongoose = require('mongoose');

exports.common_error = err => {
  console.log(err);
  res.status(500).json({error: err});
};
