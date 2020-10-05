const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//Add routes here as they are created const routename = require(path);

//use morgan during development
//parse only integers from get requests and json
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Add routes here for use app.use('/route',routename);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
