const express = require('express')
const router = express.Router()
const controller = require("../controllers/todos")

router.get('/', controller.listRecord)
router.post('/add', controller.createRecord)

module.exports = router