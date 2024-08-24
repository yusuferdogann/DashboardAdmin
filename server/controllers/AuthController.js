// const bcrypt = require("bcryptjs")
// const jwt= require('jsonwebtoken');
// const UserModel = require("../models/User")


// const signup = async(req,res)=>{
//     try {
//         const {name,email,password} = req.body;
//         const user = await UserModel.findOne({email})
//         if (user) {
//             return res.status(409)
//             .json({message:'User is already exist you can login',success:false})
            
//         }
//         const userModel = new UserModel({name,email,password})
//         userModel.password = await bcrypt.hash(password,10);
//         await userModel.save();
//         res.status(201)
//         .json({
//             message:"Signup successfully",
//             success:true
//         })

//     } catch (err) {
//         res.status(500)
//         .json({
//             message:"Internal server error1",
//             success:false
//         })
//     }
// }


// const login = async(req,res)=>{
//     try {
//         const {email,password} = req.body;
//         const user = await UserModel.findOne({email})
//         const errorMsg = "Auth failled email or password is wrong"
//         if (!user) {
//             return res.status(403)
//             .json({message:errorMsg,success:false})
            
//         }
//         const isPassEqual = await bcrypt.compare(password,user.password);
        
//         if (!isPassEqual) {
//             return res.status(403)
//             .json({message:errorMsg,success:false})
//         }
//         const jwtToken = jwt.sign(
//             {email:user.email,_id:user._id},
//             process.env.JWT_SECRET,
//             {expiresIn:'24h'}
//         )
//         res.status(200)
//         .json({
//             message:"Login successfully",
//             success:true,
//             jwtToken,
//             email,
//             name:user.name
//         })

//     } catch (err) {
//         res.status(204)
//         .json({
//             status:"success",
//             data:[],
//             message:"Internal server error1",
//             success:false
//         })
//     }
// }

// module.exports = {
//     signup,
//     login
// }
const Usermodels = require('../models/User')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')

const register= async(req,res)=>{

    try {
        const {email,username,password} = req.body
    const exituser = await Usermodels.findOne({email})

    if(exituser){
        return res.status(400).json({message:"User already exists with this email"})
    }

    const hasePassword = await bcrypt.hash(password,10)
    const newUser = new Usermodels({email,username,password:hasePassword})
    await newUser.save()
    res.status(200).json({success:true,message:"User registered succesfull",user:newUser})
    // console.log(newUser)
        
    } catch (error) {
        console.log(error)
    }

}

const login= async(req,res)=>{
    try {
        const {email,password}= req.body
    // console.log("login api")
    const user =await Usermodels.findOne({email})
    if (!user) {
     return  res.status(400).json({success:false,message:"user not found"})
    }
    const ispasswordValid = await bcrypt.compare(password,user.password)
    if(!ispasswordValid){
        return  res.status(400).json({success:false,message:"Invalid password"})

    }
    const token = jwt.sign({iserId:user._id,email:user.email},process.env.JWT_SCRET,{expiresIn:"3d"})
    res.status(200).json({success:true,message:"Login success",data:{user,token}})
    } catch (error) {
        console.log(error)
    }
}

module.exports={register,login}