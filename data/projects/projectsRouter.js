const express = require("express");
const router = express.Router();
const projectDB = require("../helpers/projectModel");

router.get('/projects', (req, res) => {
    projectDB.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({ error: error });
        })
})

router.get('/projects/:id', (req, res) => {
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

router.post('/projects/', (req, res) => {
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

router.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const content = { name, description };

    if (content) {
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

router.delete('/projects/:id', (req, res) => {
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

module.exports = router;