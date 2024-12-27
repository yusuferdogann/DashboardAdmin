// const { signup, login } = require("../controllers/AuthController");
// const { signupValidation, loginValidation } = require("../Middleware/AuthValidation");

// const router = require("express").Router();


// router.post("/login",(req,res)=>{
//     res.send("login success")
// })

// router.post("/login",loginValidation,login);
// router.post("/signup",signupValidation,signup);

// module.exports = router;


const {register,login,  getUser,logout, imageUpload, addScope}= require('../controllers/AuthController')
const {data,getdata} = require('../controllers/DataController')
const {getAccessToRoute} = require("../Middleware/authorization/auth")

const express = require('express')
// const profileImageUpload = require('../Middleware/libraries/profileImageUpload')
const updateCompanyInfo = require('../Middleware/companyInfo/companyInfo')
const {DashboardWeekGrafic,DeletedFacility,updatedFacility,FacilitySaveInfo,addedFacility,GetFacilityInfo,getOneFacility,GetAllScopeByDateOfDaily, DeletedScope, ReportPeriodData,findObjectName,summaryFilterSubData, getAllFacility,filterFacilityByUserId,filterAmountByUserId,summaryFilterData,DashboardMounthGrafic,DashboardFacilityGrafic,DashboardScopeGrafic} = require('../Middleware/facility/updateFacility')

const routers = express.Router()


routers.post('/register',register)

routers.post('/login',login)
routers.post('/logout',getAccessToRoute,logout)
routers.get("/profile",getAccessToRoute,getUser)
// routers.post("/upload",[getAccessToRoute,profileImageUpload.single("company_logo")],imageUpload)
routers.post('/uploadimage',getAccessToRoute,imageUpload)
routers.post("/companyinfo",getAccessToRoute,updateCompanyInfo)

routers.put("/updateFacilityName",getAccessToRoute,updatedFacility)
routers.post("/addfacility",getAccessToRoute,addedFacility)
// routers.delete("/delete",getAccessToRoute,deleteFacility)
routers.get("/findname",getAccessToRoute,findObjectName)
routers.get('/allfacility',getAccessToRoute,getAllFacility)

// ==================New Facilities data modeline kayit etme route 
routers.post("/adddata",getAccessToRoute,addScope)

routers.get("/getfacility",getAccessToRoute,filterFacilityByUserId)

routers.get("/getamount",getAccessToRoute,filterAmountByUserId)
routers.post("/getsummarydata",getAccessToRoute,summaryFilterData)
routers.post("/facilityinfo",getAccessToRoute,FacilitySaveInfo)
routers.get("/getfacilityinfo",getAccessToRoute,GetFacilityInfo)

routers.get("/getgraficdata",getAccessToRoute,DashboardMounthGrafic)

routers.get("/getfacilitygraficdata",getAccessToRoute,DashboardFacilityGrafic)

routers.get("/getcardgraficdata",getAccessToRoute,DashboardScopeGrafic)

routers.get("/getweekgraficdata",getAccessToRoute,DashboardWeekGrafic)

routers.post("/deletefacility",getAccessToRoute,DeletedFacility)
routers.post("/getsummarysubdata",getAccessToRoute,summaryFilterSubData)


routers.get("/reportperioddata",getAccessToRoute,ReportPeriodData)


routers.get("/getdailyscope",getAccessToRoute,GetAllScopeByDateOfDaily)
routers.post("/deletedscope",getAccessToRoute,DeletedScope)

routers.post("/getonefacility",getAccessToRoute,getOneFacility)





routers.post("/calculation",data)

routers.get("/getdata",getdata)







module.exports = routers;