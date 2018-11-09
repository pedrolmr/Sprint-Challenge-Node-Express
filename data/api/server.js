
const express = require('express');
const server = express();

const configureMiddleware = require('../config/middleware');


configureMiddleware(server);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

module.exports = server;