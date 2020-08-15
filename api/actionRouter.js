const express = require('express')
const actionsDB = require('../data/helpers/actionModel')
const {validateActionID, validateAction} = require('../middleware/actionMiddleware')
const {validateProjectID, validateProject} = require('../middleware/projectMiddleware');
const router  = express.Router();

router.get('/', (req, res) => {

      try{
        const projects = actionsDB.get()
        res.status(200).json(projects)
      }
      catch(error){
        next(error)
      }
  })
module.exports = router;