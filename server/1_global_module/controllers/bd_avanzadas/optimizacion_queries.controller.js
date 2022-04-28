let OptimizacionQueries = require("../../models/bd_avanzadas/optimizacion_queries.models") 
var moment           = require('moment')
var _                = require('underscore')

var log = console.log

module.exports.principal = async(req, res) => {
    res.status(200).send({ status: "success", message: "API Principal Optimización Queries" })
}

module.exports.test = async(req, res) => {
    res.status(200).send({ status: "success", message: "Welcome To Testing API" })
}

module.exports.buscar_por_id = async(req, res) => {
    var paramId = req.params.id
    log("Id: " + paramId)
    OptimizacionQueries.BuscarPorId(paramId).then(function(results){
        if(results.error){
            return res.status(404).send({ 
                status: "error", 
                message: results.error, 
                searchId: paramId
            })    
        }

        res.status(200).send({ 
            status: "success", 
            message: "Welcome To Search by Id", 
            searchId: paramId,
            data: results.data.toJSON()
        })    
            
    })
}

module.exports.obtener_todos_los_datos = async(req, res) => {
    //todo: Agregar funcionalidad para obtener todos los datos de la tabla
    res.status(404).send({ status: "todo", message: "Obtener todos los datos", dataLength: 0 })
}
