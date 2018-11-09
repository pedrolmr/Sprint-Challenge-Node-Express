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

server.put('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const content = { name, description };

    if(content){
        projectDB.update(id, content)
            .then(project => {
                if (project) {
                    res.status(200).json({ message: 'The project has been updated' });
                } else {
                    res.status(404).json(null);
                }
            })
            .catch(error => {
                res.json({ errorMessage: 'The project information could not be modified', error: error });
            })
    } else {
        res.status(400).json({ message: 'Please provide the information required' });
    }
})

server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;

    projectDB.remove(id)
        .then(count => {
            if (count === 1) {
                res.status(200).json({ message: 'The project has been deleted' });
            } else {
                res.status(404).json({ message: 'The project does not exist' })
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'The project cannot be deleted', error: error })
        })
})

//actions

server.get('/api/actions', (req, res) => {
    actionDB.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({ error: error });
        })
})

server.get('/api/actions/:id', (req, res) => {
    const { id } = req.params;

    actionDB.get(id)
        .then(action => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(404).json({ message: 'Action does not exist' })
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'Action cannot be retrieved', error: error })
        })
})

server.post('/api/actions/', (req, res) => {
    const { project_id, description, notes, completed } = req.body;
    const content = { project_id, description, notes, completed };
    if (content) {
        actionDB.insert(req.body)
            .then(action => {
                res.status(201).json(action)
            })
            .catch(error => {
                res.status(500).json({ error: 'the action could not be added', error });
            })
    } else {
        res.status(400).json({ errorMessage: 'Please provide the required information' });
    }
})


server.put('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes, completed } = req.body;
    const content = { project_id, description, notes, completed };
    if (content) {
        actionDB.update(id, content)
            .then(action => {
                if (action) {
                    res.status(200).json({ message: 'the action has been updated' });
                } else {
                    res.status(404).json(null);
                }
            })
            .catch(error => {
                res.json({ errorMessage: 'the action information could not be modified', error: error });
            })
    } else {
        res.status(400).json({ message: 'please provide the information required' });
    }
})


server.delete('/api/actions/:id', (req, res) => {
    const { id } = req.params;

    actionDB.remove(id)
        .then(count => {
            if (count === 1) {
                res.status(200).json({ message: 'the action has been deleted' });
            } else {
                res.status(404).json({ message: 'the action does not exist' })
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'the action cannot be deleted', error: error })
        })
})

server.get('/api/actions/project/:id', (req, res) => {
    const { id } = req.params;

    projectDB.getProjectActions(id)
        .then(actions => {
            if (actions.length > 0) {
                res.status(200).json(actions)
            } else {
                res.status(404).json({ message: 'the project has no actions' })
            }
        })
})


module.exports = server;