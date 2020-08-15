const actionDB = require('../data/helpers/actionModel')

async function validateActionID(req, res, next){
    try{
        const action = actionDB.get(req.params.id)
        if(action){
            req.action = action
            next()
        }else{
            res.status(400).json({ message: "invalid action id" })
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: 'There was a problem pulling the data from the server' })
    }
}

function validateAction(req, res, next){
    if (!req.body) {
        return res.status(400).json({ message: "missing user data" })
      } else if (!req.body.name || !req.body.description) {
        return res.status(400).json({ message: "missing required name and description field" })
      }
      next();
    }


module.exports = {
    validateActionID,
    validateAction
}