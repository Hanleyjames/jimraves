const http = require('http');
const app = require('./app');
require ('dotenv').config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);
console.log('Server is starting');
server.listen(port);
