const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Add routes here as they are created const routename = require(path);
const artistsRoutes = require('./routes/artists');
const productsRoutes = require('./routes/products');
const eventsRoutes = require('./routes/events');
const usersRoutes = require('./routes/users');

mongoose.connect('mongodb+srv://JREnt:'+process.env.MONGO_JAMES_PW+'@jimraves.6iafi.azure.mongodb.net/'+process.env.MONGO_JAMES_DB+'?retryWrites=true&w=majority');
//use morgan during development
//parse only integers from get requests and json
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Add routes here for use app.use('/route',routename);
app.get("/", function (req, res) {
  res.status(200).json({
    message: "Hello, everyone"
  });
});

app.use('/artists', artistsRoutes);
app.use('/products', productsRoutes);
app.use('/events', eventsRoutes);
app.use('/users', usersRoutes);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
