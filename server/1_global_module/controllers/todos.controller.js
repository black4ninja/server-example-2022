module.exports.listRecord = async(req,res) =>{
  res.status(200).send({status:"success",message:"Welcome To Records API"})
}

module.exports.createRecord = async(req,res) =>{
  res.status(200).send({status:"success",message:"Welcome To Create Records API"})
}

