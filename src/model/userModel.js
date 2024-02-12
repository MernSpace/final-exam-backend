const mongoose = require("mongoose")
const dataSchema = mongoose.Schema({
    name:{type:String, unique:true},
    email:{type:String},
    phone:{type:String},
    password:{type:String}
},{timeStamp:true,versionKey:false})


const userModel = mongoose.model("users",dataSchema)
module.exports = userModel;