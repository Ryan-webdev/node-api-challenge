const express = require('express');
const projectDB = require('../data/helpers/projectModel.js');
const actionDB = require('../data/helpers/actionModel.js');

const router = express.Router();

//project get
router.get('/projects', (req, res) => {
  projectDB.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving project data" });
    });
});

router.get('/projects/:id', validateProjectId, (req, res) => {
  projectDB.get(req.params.id)
    .then(project => {
      if(project) {
        res.status(200).json(project);
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving project data" });
    });
});
//project post
router.post('/projects', validateProject, (req, res) => {
  projectDB.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: "Error publishing project" });
    });
});
//project delete
router.delete('/projects/:id', validateProjectId, (req, res) => {
  projectDB.remove(req.params.id)
    .then(deleted => {
      res.status(200).json({ message: "Project successfully deleted", deleted });
    })
    .catch(err => {
      res.status(500).json({ error: "Error deleting project" });
    })
});
//project update
router.put('/projects/:id', validateProjectId, (req, res) => {
  projectDB.update(req.params.id, req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: "Error updating user" })
    });
});

//action get
router.get('/projects/:id/actions', validateProjectId, (req, res) => {
  projectDB.getProjectActions(req.params.id)
    .then(actions => {
      console.log('Actions: ', req.project.actions);
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving posts data" });
    });
});

router.get('/actions', (req, res) => {
  actionDB.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving project data" });
    });
})

router.get('/actions/:id', validateActionId, (req, res) => {
  actionDB.get(req.params.id)
    .then(project => {
      if(project) {
        res.status(200).json(project);
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving project data" });
    });
});
//action post
router.post('/projects/:id/actions', validateProjectId, validateAction, (req, res) => {
  req.body.project_id = req.params.id;
  actionDB.insert(req.body)
   .then(action => {
     res.status(201).json(action);
   })
   .catch(err => {
     res.status(500).json({error: "Error creating post"});
   });
});
//action delete
router.delete('/actions/:id', validateActionId, (req, res) => {
  actionDB.remove(req.params.id)
    .then(deleted => {
      res.status(200).json({ message: "Action successfully deleted", deleted });
    })
    .catch(err => {
      res.status(500).json({ error: "Error deleting action" });
    })
});
//action update
router.put('/actions/:id', validateActionId, (req, res) => {
  actionDB.update(req.params.id, req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: "Error updating user" })
    });
});

// VALIDATE PROJECT ID MIDDLEWARE
function validateProjectId(req, res, next) {
  projectDB.get(req.params.id)
    .then(project => {
      if(project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: "Invalid project ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving project data" });
    });
}

// VALIDATE PROJECT MIDDLEWARE
function validateProject(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "Missing project data." });
  }
  else if(!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Missing required name and description fields." });
  }
  next();
}

// VALIDATE ACTION MIDDLEWARE
function validateAction(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "Missing project data." });
  }
  else if(!req.body.description || !req.body.notes) {
    res.status(400).json({ message: "Missing required name and description fields." });
  }
  next();
}

function validateActionId(req, res, next) {
  actionDB.get(req.params.id)
    .then(project => {
      if(project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: "Invalid action ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving action data" });
    });
}


module.exports = router;