const express = require('express');
const rateLimit = require("express-rate-limit");
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const port = 5000;
const db = require('./db')();

server.set('trust proxy', 1);
server.use(express.static(__dirname + '/public'));
server.use(rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100
}));
server.use(cors());
server.use(helmet());
require('./routes')(server, db);

server.listen(port, () => {
  console.log('Server is running...')
});

module.exports = server;
