const express = require('express');
const helmet = require('helmet');

const ZoosRouter = require('./zoos/zoosRouter.js');

const server = express();
server.use(express.json());
server.use(helmet());

server.use('/api/zoos', ZoosRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Zoos API!</h2>`)
  });

module.exports = server;