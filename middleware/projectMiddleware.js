const projectDB = require('../data/helpers/projectModel')

async function validateProjectID(req, res, next){
    try{
        const project = projectDB.get(req.params.id)
        if(project){
            req.project = project
            next()
        }else{
            res.status(400).json({ message: "invalid project id" })
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: 'There was a problem pulling the data from the server' })
    }
}

function validateProject(req, res, next){
    if (!req.body) {
        return res.status(400).json({ message: "missing user data" })
      } else if (!req.body.name || !req.body.description) {
        return res.status(400).json({ message: "missing required name and description field" })
      }
      next();
    }


module.exports = {
    validateProjectID,
    validateProject
}