const express = require('express');
const projectDB = require('../helpers/projectModel');
const actionDB = require('../helpers/actionModel');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running!' });
});

server.get('/api/projects', (req, res) => {
    projectDB.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({ error: error });
        })
})

server.get('/api/projects/:id', (req, res) => {
    const { id } = req.params;

    projectDB.get(id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({ message: 'Project does not exist' })
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'The project cannot be retrieved', error: error })
        })
})

server.post('/api/projects/', (req, res) => {
    const { name, description, completed } = req.body;
    const content = { name, description, completed };
    if (content) {
        projectDB.insert(req.body)
            .then(project => {
                res.status(201).json(project)
            })
            .catch(error => {
                res.status(500).json({ error: 'The project could not be added', error });
            })
    } else {
        res.status(400).json({ errorMessage: 'Please provide the required information' });
    }
})

module.exports = server;