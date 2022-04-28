const { canViewProject, canDeleteProject, scopedProjects } = require('../rbac/permissions')

function authUser(req, res, next) {
  if (req.user == null) {
      res.status(403)
      return res.send('You need to sign in')
  }

  next()
}

function authRole(role) {
  return (req, res, next) => {
      console.log("here")
      if (req.user.role !== role) {
          res.status(401)
          return res.send('Not allowed')
      }
      next()
  }
}


function authGetProject(req, res, next) {
  if (!canViewProject(req.user, req.project)) {
    res.status(401)
    return res.send('Not Allowed')
  }

  next()
}

function authDeleteProject(req, res, next) {
  if (!canDeleteProject(req.user, req.project)) {
    res.status(401)
    return res.send('Not Allowed')
  }

  next()
}

module.exports = {
  authUser,
  authRole,
  authGetProject,
  authDeleteProject
}