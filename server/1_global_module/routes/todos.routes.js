const express = require('express')
const router = express.Router()
const controller = require("../controllers/todos.controller")
<<<<<<< HEAD
const { authUser, authRole } = require('../../rbac/Authentication')
const { ROLE, users } = require('../../rbac/user.data')
=======
>>>>>>> 434803fd89f0c9c169afb58df706f8215ee805d4

router.get('/test', authUser, authRole(ROLE.ADMIN), controller.testRecord)
router.get('/', authUser, authRole(ROLE.ADMIN), controller.listRecord)
router.post('/add', authUser, authRole(ROLE.ADMIN), controller.createRecord)

module.exports = router