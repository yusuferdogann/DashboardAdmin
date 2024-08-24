const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        trim:true

    },
    password:{
        type:String,
        required:true
    },
    data:{
        type:Date,
        default: new Date()
    }
})


const UserModel = mongoose.model("users",UserSchema)
module.exports = UserModel