//let Administrador    = require("../models/administrador.model") 
var moment           = require('moment')
var _                = require('underscore')

var log = console.log

module.exports.principal = async(req, res) => {
    res.status(200).send({ status: "success", message: "API Principal Bases de Datos Avanzadas" })
}

module.exports.test = async(req, res) => {
    res.status(200).send({ status: "success", message: "Welcome To Testing API" })
}
