require('dotenv').config()
const express = require('express');
const helmet = require('helmet');
const projectRouter = require('./api/projectRouter')
const actionRouter = require('./api/actionRouter')


const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/', projectRouter);
//server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Hello welcome to the api</h2>`);
  });



module.exports = server;