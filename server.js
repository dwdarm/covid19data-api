const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const port = process.env.PORT || 5000;
const db = require('./db');

server.set('trust proxy', 1);
server.use(express.static(__dirname + '/public'));
server.use(cors());
server.use(helmet());

db().then(data => {
  require('./routes')(server, data);
  server.listen(port, () => {
    console.log('Server is running...')
  });
})

module.exports = server;
