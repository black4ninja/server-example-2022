var path       = require('path')
var fs         = require('fs')
var _          = require('underscore')
var Promise    = require('promise')
var moment     = require('moment')
var CryptoJS   = require("crypto-js")
let Seguridad  = require(path.resolve(__dirname, '../../middlewares/utils/seguridad.util'))

var log        = console.log

var Parse = require('parse/node');

function initializeParse(){
	var Parse = require('parse/node');

	const APP_ID     = process.env.APP_ID
	const MASTER_KEY = process.env.MASTER_KEY
	const SERVER_URL = process.env.SERVER_URL

	Parse._initialize(APP_ID, "", MASTER_KEY)
	Parse.serverURL = SERVER_URL
}

exports.BuscarPorId = function ( id ){
  	return new Promise( function ( resolve, reject ) {
        exports.AsyncBuscarPorId( id, function( object, error ) {
            if( error ){ 
            	return resolve({ 
            		type: 'CONSULTA', 
            		data: null,
            		error: error.message
            	}) 
            }

            if( !object ){ 
            	return resolve({ 
            		type: 'CONSULTA', 
            		data: null, 
            		error: 'The object was not found'
            	})
            }
            
            if( !object.get("exists") || !object.get("active") ){
                return resolve({ 
                	type: 'CONSULTA', 
                	data: null, 
                	error: 'The object has been erased'
                })
            }

            return resolve({ 
            	type: 'CONSULTA', 
            	data: object, 
            	error: null 
            })
        })
  	})
}

exports.AsyncBuscarPorId = async ( id, callback ) => {
	initializeParse()

	var Table = Parse.Object.extend("DENUEDirectorio")
	var query = new Parse.Query(Table)
	query.equalTo("objectId", id)

  	try {
      	var results = await query.first()
      	callback(results, null)
  	} catch (error) {
      	callback(null,error)
  	}
} 