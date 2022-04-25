const express = require('express')
const router = express.Router()
const controller = require("../controllers/todos.controller")

router.get('/', controller.listRecord)
router.post('/add', controller.createRecord)

module.exports = router