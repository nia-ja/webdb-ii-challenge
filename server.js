const express = require('express');
const helmet = require('helmet');

const ZoosRouter = require('./zoos/zoosRouter.js');
const BearsRouter = require('./bears/bearsRouter.js');

const server = express();
server.use(express.json());
server.use(helmet());

server.use('/api/zoos', ZoosRouter);
server.use('/api/bears', BearsRouter);


server.get('/', (req, res) => {
    res.send(`<h2>Zoos API!</h2>`)
  });

module.exports = server;