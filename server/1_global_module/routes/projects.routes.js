const express = require('express')
const router = express.Router()
const controller = require("../controllers/projects.controller")
const { authUser, authRole, authGetProject, authDeleteProject } = require('../../rbac/Authentication')
const { ROLE } = require('../../rbac/user.data')
const { projects } = require('../../rbac/user.data')

router.get('/', authUser, authRole(ROLE.ADMIN), controller.listProjects)
router.get('/:projectId', setProject, authUser, authGetProject, controller.viewProject)
router.delete('/:projectId', setProject, authUser, authDeleteProject, controller.deleteProject)

function setProject(req, res, next) {
  const projectId = parseInt(req.params.projectId)
  req.project = projects.find(project => project.id === projectId)
  console.log("Setted project")
  if (req.project == null) {
    res.status(404)
    return res.send('Project not found')
  }
  next()
}

module.exports = router