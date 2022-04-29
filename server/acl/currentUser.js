module.exports = function(req, res, next) {
  console.log("Obteniendo current user");
    var UserSystem = Parse.Object.extend("UsersSystem");
    console.log("here")
    var query = new Parse.Query(UserSystem);

    query.equalTo("email", "denmf2@meeplab.com")
    query.include("permissionPtr");
    console.log("here2")

  query.equalTo("exists", true);
  query.equalTo("active", true);

  //const results = await query.find();
  query.first().then((results) => {
    // Do something with the returned Parse.Object values
    //console.log("Se encontro al usuario: " + results.id);
        if(results){
          console.log("here3")
          req.currentUser = results;
          next();
        }else{
          console.log("El usuario no se encontró");
          req.currentUser = null;
          next();
        }
  }, (error) => {
    // Execute any loxgic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    console.log("her5e")
        console.log(error.message);
        req.currentUser = null;
        next();
  });
}