const express = require('express')
const router = express.Router()
const controller = require("../controllers/books.controller")
var currentUser = require('../../acl/currentUser')
var requirePermissions = require('../../acl/permissions')

router.get('/', controller.listBooks)
router.get('/:permission', currentUser, requirePermissions, controller.listBooks)

module.exports = router