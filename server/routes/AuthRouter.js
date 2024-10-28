// const { signup, login } = require("../controllers/AuthController");
// const { signupValidation, loginValidation } = require("../Middleware/AuthValidation");

// const router = require("express").Router();


// router.post("/login",(req,res)=>{
//     res.send("login success")
// })

// router.post("/login",loginValidation,login);
// router.post("/signup",signupValidation,signup);

// module.exports = router;


const {register,login, addFacility, getUser,logout, imageUpload, addData}= require('../controllers/AuthController')
const {data,getdata} = require('../controllers/DataController')
const {getAccessToRoute} = require("../Middleware/authorization/auth")

const express = require('express')
const profileImageUpload = require('../Middleware/libraries/profileImageUpload')
const updateCompanyInfo = require('../Middleware/companyInfo/companyInfo')
const {updateFacility,addedFacility, deleteFacility, findObjectName, getAllFacility} = require('../Middleware/facility/updateFacility')

const routers = express.Router()


routers.post('/register',register)

routers.post('/login',login)
routers.post('/logout',getAccessToRoute,logout)
routers.get("/profile",getAccessToRoute,getUser)
routers.post("/upload",[getAccessToRoute,profileImageUpload.single("company_logo")],imageUpload)

routers.post("/companyinfo",getAccessToRoute,updateCompanyInfo)

routers.post("/facility",getAccessToRoute,updateFacility)
routers.post("/addfacility",getAccessToRoute,addedFacility)
routers.delete("/delete",getAccessToRoute,deleteFacility)
routers.get("/findname",getAccessToRoute,findObjectName)
routers.get('/allfacility',getAccessToRoute,getAllFacility)

// ==================New database data modelinden olusma veriyi 
routers.post("/adddata",getAccessToRoute,addData)



routers.post("/calculation",data)

routers.get("/getdata",getdata)







module.exports = routers;