const express = require('express')
const router = express.Router()
const controller = require("../controllers/bd_avanzadas.controller")

router.get('/', controller.principal)
router.get('/test', controller.test)

var optimizacion_queries = require('./bd_avanzadas/optimizacion_queries.routes');
router.use('/optimizacion_queries', optimizacion_queries);

module.exports = router