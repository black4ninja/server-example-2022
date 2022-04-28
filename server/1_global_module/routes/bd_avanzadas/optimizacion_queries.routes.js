const express = require('express')
const router = express.Router()
const controller = require("../../controllers/bd_avanzadas/optimizacion_queries.controller")

router.get('/', controller.principal)
router.get('/test', controller.test)
router.get('/buscar_por_id/:id', controller.buscar_por_id)

//todo: API Optimizacion Queries
router.get('/obtener_todos_los_datos', controller.obtener_todos_los_datos)

module.exports = router