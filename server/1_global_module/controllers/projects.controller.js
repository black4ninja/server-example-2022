const { projects } = require('../../rbac/user.data')

module.exports.listProjects = async(req,res) =>{  
  res.json(projects)
}

module.exports.viewProject = async(req,res) =>{
  console.log("here")
  res.json(req.project)
}

module.exports.deleteProject = async(req,res) =>{
  res.send('Deleted Project')
}