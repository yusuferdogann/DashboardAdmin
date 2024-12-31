const Usermodels = require("../models/User");
const ScopeModel = require("../models/scopes");
const express = require("express");
const CustomError = require("../helpers/error/CustomError");
const FacilityModel = require("../models/facility")
const asyncErrorWrapper = require("express-async-handler");
const { sendJwtToClient,getAccessTokenFromHeader } = require("../helpers/authorization/tokenHelpers");
const {
  validateUserInput,
  comparePassword,
} = require("../helpers/input/inputHelpers");

const register = asyncErrorWrapper(async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await Usermodels.create({
    username,
    email,
    password,
  });

  //   vide 250 4.15 silindi yerine sendJwtToClient yapasi olsutruldu

  //   const token =   user.genereteJwtFromUser();
  //   console.log(token)
  //   res.status(200).json({
  //     success: true,
  //     data: user,
  //   });

  sendJwtToClient(user, res);
});

const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!validateUserInput(email, password)) {
    return next(new CustomError("Please check your inputs", 400));
  }

  const user = await Usermodels.findOne({ email }).select("+password");

  if (!comparePassword(password, user.password)) {
    return next(new CustomError("Pelease check your credentials", 400));
  }

  // Ders 253 te 13.06 kaldiriyor onun yerine alttaki sendJwtToClinent functionu ekliyor
  // res.status(200)
  // .json({
  //   success:true
  // })
  // getAccessTokenFromHeader(user,res)
  sendJwtToClient(user, res);
});
const logout = asyncErrorWrapper(async (req, res, next) => {
  const { NODE_ENV } = process.env;
  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successfull",
    });
});
const addFacility = async (req, res) => {
  //   console.log(token)
};

// const imageUpload = asyncErrorWrapper(async (req, res, next) => {

//  const user =  await Usermodels.findByIdAndUpdate(req.user.id,{
//     "company_logo" : req.saveProfileImage
//   },{
//     new:true,
//     runValidators:true
//   })
//   res.status(200).json({
//     success: true,
//     message: "Image upload successfull",
//     data:user
//   });
// });


// const imageUpload = asyncErrorWrapper(async (req, res, next) => {

//   // console.log(req.body)
//   const id = req.user.id

//   const {base64} = req.body

//   // <SORGU - UPDATE>
//    const deneme = Usermodels.findByIdAndUpdate(id,{company_logo:base64 } ).exec();

//   // const user =  await Usermodels.findByIdAndUpdate(req.user.id,{"company_logo" : req.body}).exec()

//    res.status(200).json({
//      success: true,
//      message: "Image upload successfull",
//      data:deneme
//    });
//  });
 

const addScope = asyncErrorWrapper(async(req,res,next)=>{
    const {yakitturu,plaka,birim,ilce,kaynak,miktar,sehir,situation,subtitle,tarih,tesis,title,ulke,type,gasType} = req.body;
    const savedData = await ScopeModel.create({
      gasType,
      birim,
      ilce,
      kaynak,
      miktar,
      sehir,
      situation,
      subtitle,
      tarih,
      tesis,
      title,
      ulke,
      type,
      yakitturu,
      plaka,
      user:req.user.id
    })
    res.status(200)
    .json({
      success:true,
      message:'add data operation is successfull',
      data:savedData
    })
})

const getUser = (req, res, next) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name,
      password: req.user.password,
    },
  });

 
  // return next(new CustomError("BIR HATA OUSTUR",400))
  //   return next(new CustomError("BIR HATA OUSTU"));
};
module.exports = { register, login, addFacility, getUser, logout,addScope};
