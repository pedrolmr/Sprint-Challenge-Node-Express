const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const projectsRouter = require('../projects/projectsRouter');
const actionsRouter = require('../actions/actionsRouter');

module.exports = server => {
    server.use(express.json());
    server.use(helmet());
    server.use(morgan('short'));

    server.use('/api', projectsRouter);
    server.use('/api', actionsRouter);
};