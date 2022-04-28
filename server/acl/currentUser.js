module.exports = function(req, res, next) {
  console.log("Obteniendo current user");
    var UserSystem = Parse.Object.extend("UsersSystem");
    var query = new Parse.Query(UserSystem);
    query.equalTo("email", "denmf@meeplab.com")
    query.include("permissionPtr");
    var promise = query.first({
      success: function(usuario) {
        console.log("Se encontro al usuario: " + usuario.id);
        if(usuario){
          req.currentUser = usuario;
          next();
        }else{
          console.log("El usuario no se encontró");
          req.currentUser = null;
          next();
        }
      },
      error: function(error) {
        console.log(error.message);
        req.currentUser = null;
        next();
      }
    });
}