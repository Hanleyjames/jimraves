const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
//Add routes here as they are created const routename = require(path);
const artistsRoutes = require('./routes/artists');
const productsRoutes = require('./routes/products');
const eventsRoutes = require('./routes/events');
const usersRoutes = require('./routes/users');
const STRING_URL = `mongodb+srv://`+`${(process.env.MONGO_USERNAME_DEV || process.env.MONGO_USERNAME_HEROKU)}`+`:${(process.env.MONGO_PASSWORD_DEV || process.env.MONGO_PASSWORD_HEROKU)}`+'@jimraves.6iafi.azure.mongodb.net';
mongoose.connect(STRING_URL ,{dbName: process.env.MONGO_DBNAME, useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

//use morgan during development
//parse only integers from get requests and json
app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
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
