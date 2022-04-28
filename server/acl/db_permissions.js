var _         = require("underscore");
var Parse     = require('parse/node');
Parse._initialize("app_id", "", "master_key");
Parse.serverURL = 'http://localhost:6535/parse';

var permission_list = [];

var Permissions = Parse.Object.extend("Permissions");
var permission = new Permissions();
permission.set("group", "ADMIN");
permission.set("type", "SUPERADMIN");
permission.set("action", "TRW");
permission.set("permission", ["index","gallery-list","gallery-add","gallery-edit","gallery-delete","course-list","course-add","course-edit","course-delete","contacts-list","contacts-add","contacts-edit","contacts-delete","finance-list","finance-add","finance-edit","finance-delete","businesses-list","businesses-add","businesses-edit","businesses-delete","users-list","users-add","users-edit","users-delete","permissions-list","permissions-add","permissions-edit","permissions-delete"]);
permission.set("supreme", true);
permission.set("active", true);
permission.set("exists", true);
permission_list.push(permission);

var Permissions = Parse.Object.extend("Permissions");
var permission = new Permissions();
permission.set("group", "ADMIN");
permission.set("type", "MARKETING");
permission.set("action", "TRW");
permission.set("permission", ["gallery-list","gallery-add","gallery-edit","gallery-delete"]);
permission.set("supreme", false);
permission.set("active", true);
permission.set("exists", true);
permission_list.push(permission);

var Permissions = Parse.Object.extend("Permissions");
var permission = new Permissions();
permission.set("group", "ADMIN");
permission.set("type", "FINANCE");
permission.set("action", "TRW");
permission.set("permission", ["finance-list","finance-add","finance-edit","finance-delete"]);
permission.set("supreme", false);
permission.set("active", true);
permission.set("exists", true);
permission_list.push(permission);

var Permissions = Parse.Object.extend("Permissions");
var permission = new Permissions();
permission.set("group", "ADMIN");
permission.set("type", "ADMINISTRATIVE");
permission.set("action", "TRW");
permission.set("permission", ["index","course-list","course-add","course-edit","course-delete","businesses-list","businesses-add","businesses-edit","businesses-delete","users-list","users-add","users-edit","users-delete"]);
permission.set("supreme", false);
permission.set("active", true);
permission.set("exists", true);
permission_list.push(permission);

Parse.Object.saveAll(permission_list, {
  success: function(list) {
    console.log("Guardado permisos correctamente");
  },
  error: function(error) {
    conso.log("Error " + error.message);
  },
});
//ADMIN Permissions
/*
index
gallery-list
gallery-add
gallery-edit
gallery-delete
course-list
course-add
course-edit
course-delete
contacts-list
contacts-add
contacts-edit
contacts-delete
finance-list
finance-add
finance-edit
finance-delete
businesses-list
businesses-add
businesses-edit
businesses-delete
users-list
users-add
users-edit
users-delete
permissions-list
permissions-add
permissions-edit
permissions-delete
*/

