const fs         = require("fs")
const csv        = require('csvtojson')
const _          = require('underscore')
const moment     = require('moment')
const now        = require("performance-now")
const testFolder = './conjunto_de_datos/';
const log        = console.log

/*
IMPORTANTE ANTES DE CORRER
VERIFICAR QUE LOS CSV ESTEN GUARDADOS CON ENCODING UTF8, POR DEFAULT BAJADO DE LA PÁGINA TRAE OTROS
node --expose-gc scriptInsertData.js
*/

var Parse = require('parse/node');
var process
fs.readFile("./../../dev-server-example.json", function (err, data) {
  process = JSON.parse(data)
  process = process.apps[0]

	fs.readdir(testFolder, (err, files) => {
  	iterateFiles(0,files).then(function(){ 
	  }) 
	});
})
	

var headers    = []
var array_data = []

function iterateFiles(index,files){
	return new Promise((resolve,reject)=>{

		array_data = []

    if(index >= files.length){
			resolve()
		}else{
			log(files[index])
			var csvFilePath = testFolder + files[index]
			csv({

			}).fromFile(csvFilePath).subscribe((json)=>{})
			.on('header',(header)=>{
			  //log(header)
			  headers = header
			})
			.on('data',(buffer)=>{
		    array_data.push(JSON.parse(buffer.toString("utf8")))
			})
			.on('error',(err)=>{
				//log(err)
			})
			.on('done',(error)=>{
			    log(array_data.length)
			    manipulateChunkData(0).then(function(){
				    //resolve()
				    iterateFiles((index+1), files)
				  }) 
			    
			})
		}  
  })
}

function manipulateChunkData(index){
	return new Promise((resolve,reject)=>{
		const start = now()
		log(index)
		if(index >= array_data.length){
			resolve()
		}else{
			var subArray = []
			var searchIndex = []
			var indexIds
			var subIndex = 0
			while(subIndex < 999 && index < array_data.length){	
				searchIndex.push(array_data[index]["id"])
				subArray.push(array_data[index])
				index++
				subIndex++
			}

			queryTable(searchIndex).then((results) => {
				var updatableArray = []
				var newArray = []

		    for(var i = 0; i < subArray.length; i++){
		    	var found = false
		    	if(results && results.length > 0){
		    		for(var j = 0; j < results.length; j++){
			    		if(subArray[i]["id"] === results[j].get("id_denue")){
			    			results[j].set("id_denue", subArray[i]["id"])
			    			var latitud = null
								var longitud = null
								var containdedSearch = ""
			    			for(var k = 0; k < headers.length; k++){
									if(headers[k] !== "id"){
										if(headers[k] === "latitud"){
											if(subArray[i][headers[k]]){
												latitud = Number(subArray[i][headers[k]])
											}
											//log(latitud)
										}else if(headers[k] === "longitud"){
											if(subArray[i][headers[k]]){
												longitud = Number(subArray[i][headers[k]])
											}
											//log(longitud)
										}else if(headers[k] === "cod_postal"){
											//log(headers[k] + " " + Number(subArray[i][headers[k]]))
											//log("CP")
											results[j].set(headers[k], Number(subArray[i][headers[k]]))	
										}else if(headers[k] === "correoelec"){
											//log("Correo")
											results[j].set(headers[k], subArray[i][headers[k]].toLowerCase())	
											//log("Fin correo")
										}else if(headers[k] === "www"){
											results[j].set(headers[k], subArray[i][headers[k]].toLowerCase())	
										}else if(headers[k] === "nombre_act" || headers[k] === "raz_social" || headers[k] === "nom_estab"){
											containdedSearch += subArray[i][headers[k]].toLowerCase() + " "
											results[j].set(headers[k], subArray[i][headers[k]])	
										}else{
											results[j].set(headers[k], subArray[i][headers[k]])	
										}
									}
								}
								if(latitud && longitud){
									var point = new Parse.GeoPoint({latitude: latitud, longitude: longitud})
									results[j].set("coordenadas", point)
								}
								containdedSearch = removeAccents(containdedSearch)
								results[j].set("searchField", containdedSearch)
			    			updatableArray.push(results[j])
			    			found = true
			    			break
			    		}
			    	}
		    	}
			    	
		    	if(!found){
		    		const Table = Parse.Object.extend("DENUEDirectorio");
						const object = new Table();

						//log("Id " + subArray[i])
						object.set("id_denue", subArray[i]["id"])
						var latitud = null
						var longitud = null
						var containdedSearch = ""
						for(var j = 0; j < headers.length; j++){
							if(headers[j] !== "id"){
								if(headers[j] === "latitud"){
									if(subArray[i][headers[j]]){
										latitud = Number(headers[j])
									}
								}else if(headers[j] === "longitud"){
									if(subArray[i][headers[j]]){
										longitud = Number(headers[j])
									}
								}else if(headers[j] === "cod_postal"){
									//log(headers[j] + " " + Number(subArray[i][headers[j]]))
									object.set(headers[j], Number(subArray[i][headers[j]]))
								}else if(headers[j] === "correoelec"){
									//log("CORREO")
									object.set(headers[j], subArray[i][headers[j]].toLowerCase())	
								}else if(headers[j] === "www"){
									object.set(headers[j], subArray[i][headers[j]].toLowerCase())	
								}else if(headers[j] === "nombre_act" || headers[j] === "raz_social" || headers[j] === "nom_estab"){
									containdedSearch += subArray[i][headers[j]].toLowerCase() + " "
									object.set(headers[j], subArray[i][headers[j]])	
								}else{
									object.set(headers[j], subArray[i][headers[j]])	
								}
							}	
						}

						if(latitud && longitud){
							var point = new Parse.GeoPoint({latitude: latitud, longitude: longitude})
							object.set("coordenadas", point)
						}
						containdedSearch = removeAccents(containdedSearch)
						object.set("searchField", containdedSearch)
						
						object.set("active", true)
						object.set("exists", true)

						newArray.push(object)
		    	}
		    }

		    //log("Updatable " + updatableArray.length)
		    Parse.Object.saveAll(updatableArray)
			  .then((list) => {
			  	//log("New " + newArray.length)
			    Parse.Object.saveAll(newArray)
				  .then((list) => {
				    //resolve()
				    results = []
				    subArray = []
						searchIndex = []
						newArray = []
						updatableArray = []
						list = []
						forceGC()
						const end = now()
						const duration = start-end
						log("Duration " + millisToMinutesAndSeconds(duration))
						//log("Duration " + d)
				    manipulateChunkData((index))
				  }, (error) => {
			      log(error.message)
				  });
			  }, (error) => {
		      log(error.message)
			  });
		  }).catch((error) => {
		    console.log(error)
		  })
		}		
	})
}

async function queryTable(searchIndex) {
  var Parse = require('parse/node');
	Parse._initialize(process.env.APP_ID, "", process.env.MASTER_KEY);
	Parse.serverURL = process.env.SERVER_URL;

  var Table = Parse.Object.extend("DENUEDirectorio");
	var query = new Parse.Query(Table);
  query.containedIn("id_denue", searchIndex);
  query.equalTo("active",true)
  query.equalTo("exists",true)
  query.limit(1000)
  try {
    const results = await query.find()
    return results
  }catch (error) {
  	log(error.message)
    throw new Error(error);
  }
}

function removeAccents(strAccents){
	var strAccents = strAccents.split('');
	var strAccentsOut = new Array();
	var strAccentsLen = strAccents.length;
	var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
	var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
	for (var y = 0; y < strAccentsLen; y++) {
	 if (accents.indexOf(strAccents[y]) != -1) {
	   strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
	 } else
	   strAccentsOut[y] = strAccents[y];
	}
	strAccentsOut = strAccentsOut.join('');
	return strAccentsOut;
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function forceGC(){
   if (global.gc) {
      global.gc();
   } else {
      console.warn('No GC hook! Start your program as `node --expose-gc file.js`.');
   }
}