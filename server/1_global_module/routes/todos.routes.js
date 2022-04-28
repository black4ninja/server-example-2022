const express = require('express')
const router = express.Router()
const controller = require("../controllers/todos.controller")
const { authUser, authRole } = require('../../rbac/Authentication')
const { ROLE, users } = require('../../rbac/user.data')

router.get('/test', authUser, authRole(ROLE.ADMIN), controller.testRecord)
router.get('/', authUser, authRole(ROLE.ADMIN), controller.listRecord)
router.post('/add', authUser, authRole(ROLE.ADMIN), controller.createRecord)

module.exports = router