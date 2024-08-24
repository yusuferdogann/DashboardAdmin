const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    date:{
        type:String,
        unique:true
    },
    title:{
        type:String,
        trim:true

    },
    subtitle:{
        type:String,
    },
   cities:{
    type:String,


   },
   units:{
    type:String,


   },
   amount:{
    type:String,


   }})


const DataModel = mongoose.model("data",UserSchema)
module.exports = DataModel