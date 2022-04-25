const fs         = require("fs")
const csv        = require('csvtojson')
const _          = require('underscore')
const moment     = require('moment')
const testFolder = './conjunto_de_datos/';
const log        = console.log

var Parse = require('parse/node');
var process
var json = []
fs.readFile("./../../dev-server-example.json", function (err, data) {
  process = JSON.parse(data)
  process = process.apps[0]

	var fileCat  = "categorias.json"
	
	fs.readFile(fileCat, function (err, data) {
	  json = JSON.parse(data)
	 	log(json.length)
	 	insertBulk(0)
	})
})

function insertBulk(index){
	return new Promise((resolve,reject)=>{
		log(json.length)
		log(index)
		if(index >= json.length){
			resolve()
		}else{
			var subArray = []
			var searchIndex = []
			var indexIds
			var subIndex = 0
			while(subIndex < 999 && index < json.length){
				searchIndex.push(json[index]["nombre_act"])
				subArray.push(json[index]["nombre_act"])
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
			    		if(subArray[i] === results[j].get("name")){
			    			results[j].set("name", subArray[i])
			    			updatableArray.push(results[j])
			    			found = true
			    			break
			    		}
			    	}
		    	}
			    	
		    	if(!found){
		    		const Table = Parse.Object.extend("DENUECategorias");
						const object = new Table();

						object.set("name", subArray[i]);
						object.set("active", true);
						object.set("exists", true);

						newArray.push(object)
		    	}
		    }

		    log("Updatable " + updatableArray.length)
		    Parse.Object.saveAll(updatableArray)
			  .then((list) => {
			  	log("New " + newArray.length)
			    Parse.Object.saveAll(newArray)
				  .then((list) => {
				    insertBulk((index))
				  }, (error) => {
			      
				  });
			  }, (error) => {
		      
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

  var Table = Parse.Object.extend("DENUECategorias");
	var query = new Parse.Query(Table);
  query.containedIn("name", searchIndex);
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