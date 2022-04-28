module.exports.testRecord = async(req, res) => {
  res.send("Testing RBAC")
}

module.exports.listRecord = async(req,res) =>{
  //Manda llamar el modelo
  res.status(200).send({status:"success",message:"Welcome To Records API"})
}

module.exports.createRecord = async(req,res) =>{
  res.status(200).send({status:"success",message:"Welcome To Create Records API"})
}