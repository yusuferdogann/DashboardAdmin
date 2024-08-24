// const { signup, login } = require("../controllers/AuthController");
// const { signupValidation, loginValidation } = require("../Middleware/AuthValidation");

// const router = require("express").Router();


// router.post("/login",(req,res)=>{
//     res.send("login success")
// })

// router.post("/login",loginValidation,login);
// router.post("/signup",signupValidation,signup);

// module.exports = router;


const {register,login}= require('../controllers/AuthController')
const {data,getdata} = require('../controllers/DataController')

const express = require('express')

const routers = express.Router()


routers.post('/register',register)

routers.post('/login',login)

routers.post("/calculation",data)

routers.get("/getdata",getdata)





module.exports = routers;