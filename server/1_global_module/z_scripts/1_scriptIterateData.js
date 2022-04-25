const fs         = require("fs")
const csv        = require('csvtojson')
const _          = require('underscore')
const moment     = require('moment')
const testFolder = './conjunto_de_datos/';
const log        = console.log

/*
IMPORTANTE ANTES DE CORRER
VERIFICAR QUE LOS CSV ESTEN GUARDADOS CON ENCODING UTF8, POR DEFAULT BAJADO DE LA PÁGINA TRAE OTROS
*/

var total = 0
fs.readdir(testFolder, (err, files) => {
  iterateFiles(0,files).then(function(){
    log("Total registros " + total)    
  }) 
});

var states     = []
var categories = []
var municipe   = []

function iterateFiles(index,files){
	return new Promise((resolve,reject)=>{

		var array_data = []

    if(index >= files.length){
			resolve()
		}else{
			log(files[index])
			var csvFilePath = testFolder + files[index]
			csv({

			}).fromFile(csvFilePath).subscribe((json)=>{})
			.on('header',(header)=>{
			  //log(header)
			})
			.on('data',(buffer)=>{
		    array_data.push(JSON.parse(buffer.toString("utf8")))
			})
			.on('error',(err)=>{
				//log(err)
			})
			.on('done',(error)=>{
			    log(array_data.length)
			    
			    for(var i = 0; i < array_data.length; i++){
			    	categories.push({nombre_act:array_data[i]["nombre_act"]})
			    	states.push({entidad:array_data[i]["entidad"]})
			    	municipe.push({municipio:array_data[i]["municipio"],entidad:array_data[i]["entidad"]})
			    }

			    categories = _.uniq(categories, function(item){ return item.nombre_act });
			    states = _.uniq(states, function(item){ return item.entidad });
			    municipe = _.uniq(municipe, function(item){ return item.municipio });

			    log(categories.length)
			    log(states.length)
			    log(municipe.length)

			    var fileCat  = "categorias.json"
			    var fileStat = "estados.json"
			    var fileMun  = "municipios.json"

			    var json
			    fs.readFile(fileCat, function (err, data) {
				    json = JSON.parse(data)
				    json.push.apply(json, categories)
				    json = _.uniq(json, function(item){ return item.nombre_act });

				    fs.writeFile(fileCat, JSON.stringify(json,null, 2),function(err, result) {
			      	if(err) console.log('error', err);
			      	var json
					    fs.readFile(fileStat, function (err, data) {
						    json = JSON.parse(data)
						    json.push.apply(json, states)
						    json = _.uniq(json, function(item){ return item.entidad });

						    fs.writeFile(fileStat, JSON.stringify(json,null, 2),function(err, result) {
					      	if(err) console.log('error', err);
					      	fs.readFile(fileMun, function (err, data) {
								    json = JSON.parse(data)
								    json.push.apply(json, municipe)
								    json = _.uniq(json, function(item){ return item.municipio });

								    fs.writeFile(fileMun, JSON.stringify(json,null, 2),function(err, result) {
							      	if(err) console.log('error', err);
							      	//resolve()
							      	iterateFiles((index+1), files)
							    	})
								  })
					    	})
						  })
			    	})
				  })
			})
		}  
  })
}

function manipulateChunkData(data){

}