const express = require("express");
const router = express.Router();
const actionDB = require("../helpers/actionModel");
const projectDB = require("../helpers/projectModel");

router.get('/actions', (req, res) => {
    actionDB.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({ error: error });
        })
})

router.get('/actions/:id', (req, res) => {
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

router.post('/actions/', (req, res) => {
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


router.put('/actions/:id', (req, res) => {
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


router.delete('/actions/:id', (req, res) => {
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

router.get('/actions/project/:id', (req, res) => {
    const { id } = req.params;

    projectDB.getProjectActions(id)
        .then(actions => {
            if (actions.length > 0) {
                res.status(200).json(actions)
            } else {
                res.status(404).json({ message: 'The project has no actions' })
            }
        })
})

module.exports = router;