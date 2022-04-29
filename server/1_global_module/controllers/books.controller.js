module.exports.listBooks = async(req,res) =>{
  //Manda llamar el modelo
  console.log(req.currentUser)
  console.log("permisos")
  console.log(req.params.permission)
  res.status(200).send({status:"success",message:"Welcome To Books API"})
}