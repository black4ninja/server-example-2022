module.exports = function(req, res, next) {
  console.log("Iniciando permisos");
  if(req.currentUser){
    req.PERMISSIONS.hasPermissions(req, res, req.currentUser.get("permissionPtr").get("type"), "TRW", req.params.permission).then(function(result) {
      console.log("Resultado permiso " + result);  
      if(result){
        next();
      }else{
        res.redirect("/user/login");
      }
    });
  }else{
    res.redirect("/user/login");
  }
    
}