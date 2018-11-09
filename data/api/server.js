const express = require('express');
const server = express();

const cors = require('cors');
server.use(cors({ origin: 'http://localhost:3000' }));

const configureMiddleware = require('../config/middleware');


configureMiddleware(server);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

module.exports = server;