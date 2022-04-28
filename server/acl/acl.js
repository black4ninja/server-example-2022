var _         = require("underscore");
var Parse = require('parse/node');

Parse._initialize("app_id", "", "master_key");
Parse.serverURL = 'http://localhost:6535/parse';

var Acl = require("virgen-acl").Acl, acl = new Acl();

/* PERMISOS */

/* END PERMISOS */

var Permissions = Parse.Object.extend("Permissions");
var query = new Parse.Query(Permissions);
query.limit(1000);
query.equalTo("exists", true);
query.equalTo("active", true);
query.find({
  success: function(results) {
    //console.log("After query permissions");
    for(var i = 0; i < results.length; i++){
      acl.addRole(results[i].get("type"));    
    }
    // Set up resources
    acl.addResource("TRW");

    // Set up access rules (LIFO)
    acl.deny();

    for(var i = 0; i < results.length; i++){
      if(results[i].get("supreme")){
        acl.allow(results[i].get("type"));
      }else{
        acl.allow(results[i].get("type"), results[i].get("action"), results[i].get("permission"));
      }
    }
  },
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
});

    

exports.hasPermissions = function(req, res, type_permission, resource, action){
  //console.log("Entrando top");
  return new Promise(function(resolve,reject) {
    acl.query(type_permission, resource, action, function(err, allowed) {
      if (allowed) {
        // commenting allowed!
        resolve(true);
      } else {
        console.log(err);
        resolve(false);
        // no commenting allowed!
      }
    });
  });   
}