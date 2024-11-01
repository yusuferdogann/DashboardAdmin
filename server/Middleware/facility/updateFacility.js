const asyncErrorWrapper = require("express-async-handler");
const Usermodels = require("../../models/User");
const Data = require("../../models/data");
const { data } = require("../../controllers/DataController");
const uniqid = require('uniqid'); 
const { useState } = require("react");



const updateFacility = asyncErrorWrapper(async (req,res,next) =>{
    const user =  await Usermodels.findByIdAndUpdate(req.user.id,{
      "facility":[
        {
        "scope1": {
              name: "Scope-1",
              states: [
                {
                  id: 1,
                  name: "SABIT YANMA",
                  short: ['sabit'],
                  data: [
                      {"kaynak":"buzdolabi","birim":"megawatt","miktar":"1000m3"}
                  ],
                 
                },
                {
                  id: 2,
                  name: "HAREKETLI YANMA",
                  short: ['hareketli'],
                  data: [
                      {"kaynak":"buzdolabi","birim":"megawatt","miktar":"1000m3"}
                  ],
                  
                },
                {
                  id: 3,
                  name: "DOGRUDAN SIZMA KACAK EMISYONU",
                  short: ['dogrudan'],
                  data: [
                      {"kaynak":"buzdolabi","birim":"megawatt","miktar":"1000m3"}

                  ],
                 
                },
        
              ],
          },
        "scope2": {
             
              states: [
                {
                  id: 1,
                  name: "Satın Alınan Enerji",
                  data: [
                      {"name":"buzdolabi","birim":"megawatt","miktar":"1000m3"},
                      {"name":"derin dondurucu","birim":"kilowatt","miktar":"350m3"}
                  ],
                 
                },
              ],
          },
        "scope3":{
              states: [
                {
                  id: 1,
                  name: "Upstream Nakliye (aracın firmaya ait olması durumunda)",
                  data: [
                      {"aracturu":"otobus","yakitturu":"dizel","birim":"lt","miktar":"400"}

                  ],
                },
                {
                  id: 2,
                  name: "Downstream Nakliye hizmetin dışardan satın alınması durumunda)",
                  data: [{
                      "sahsiaraclar":[
                          {"aracturu":"otobus","yakitturu":"dizel","birim":"lt","miktar":"400"}
                      ],
                      "servisaraclar":[
                          {"aracturu":"otobus","yakitturu":"dizel","birim":"lt","miktar":"400"}
                      ],
                      "musteriziyareti":[
                          {"aracturu":"otobus","yakitturu":"dizel","birim":"lt","miktar":"400"}
                      ],
                      "isseyahatlari":[
                          {"aracturu":"otobus","yakitturu":"dizel","birim":"lt","miktar":"400"}
                      ]

                  }],
                  
        
                },
        
              ],
          },
        }
      ],
      },{
        new:true,
        runValidators:true
      })
      res.status(200).json({
        success: true,
        message: "facility upload successfull",
        data:user
      });
})

const addedFacility = asyncErrorWrapper( async (req,res,next)=>{

    const id = await Usermodels.findById(req.user.id)
    const [text, setText] = useState("Hello world")
    console.log("TEXTTT",text)
  //   const item = {
  
  // name:"ASELSAN KONYA SUBE",
  // country:"Turkiye",
  // city:"Konya",
  // town:'Selcuklu',
  // totalco2:'12.500ton',
  // facilityId:uniqid(),
  // data:{
  //  "Scope-1": {
  //       states: [
  //         {
  //           id: 1,
  //           name: "SABIT YANMA",
  //           data: [
  //               {"kaynak":"buzdolabi","birim":"megawatt","miktar":"1000m3"}
  //           ],
  //         },
  //         {
  //           id: 2,
  //           name: "HAREKETLI YANMA",
  //           data: [
  //               {"kaynak":"buzdolabi","birim":"megawatt","miktar":"1000m3"}
  //           ],
  //         },
  //         {
  //           id: 3,
  //           name: "DOGRUDAN SIZMA KACAK EMISYONU",
  //           data: [
  //               {"kaynak":"buzdolabi","birim":"megawatt","miktar":"1000m3"}
  //           ],
  //         },
  //       ],
  //   },
  //  "Scope-2": {
  //       states: [
  //         {
  //           id: 1,
  //           name: "Satın Alınan Enerji",
  //           data: [
  //               {"name":"buzdolabi","birim":"megawatt","miktar":"1000m3"},
  //               {"name":"derin dondurucu","birim":"kilowatt","miktar":"350m3"}
  //           ],
  //         },
  //       ],
  //   },
  //  "Scope-3": {
  //       states: [
  //         {
  //           id: 1,
  //           name: "Upstream Nakliye (aracın firmaya ait olması durumunda)",
  //           data: [
  //               {"aracturu":"otobus","yakitturu":"dizel","birim":"lt","miktar":"400"}
  //           ],
  //         },
  //         {
  //           id: 2,
  //           name: "Downstream Nakliye hizmetin dışardan satın alınması durumunda)",
  //           data: [{
  //               "sahsiaraclar":[
  //                   {"aracturu":"otobus","yakitturu":"dizel","birim":"lt","miktar":"400"}
  //               ],
  //               "servisaraclar":[
  //                   {"aracturu":"otobus","yakitturu":"dizel","birim":"lt","miktar":"400"}
  //               ],
  //               "musteriziyareti":[
  //                   {"aracturu":"otobus","yakitturu":"dizel","birim":"lt","miktar":"400"}
  //               ],
  //               "isseyahatlari":[
  //                   {"aracturu":"otobus","yakitturu":"dizel","birim":"lt","miktar":"400"}
  //               ]
  //           }],
  //         },
  //       ],
  //   },
  // }  
  //   }
  // const item = {
  //   birim: "ton",
  //   id: 1,
  //   ilce: "Etimeskut",
  //   kaynak: "Sıkıştırılmış Doğal Gaz (CNG)",
  //   miktar: "123",
  //   sehir: "Ankara",
  //   subtitle: "HAREKETLI YANMA",
  //   tarih: "25/10/2024 - 7:5",
  //   tesis: "ASELSAN KONYA SUBE",
  //   title: "Scope-1",
  //   ulke: "Turkiye"
  // }
  const item = {city,country,employeecount,facilityname,state,totalarea} = req.body;

    Usermodels.findByIdAndUpdate(id, { $push: { facility: item } }).exec();
   
      res.status(200).json({
        success: true,
        message: "facility add successfull",
        data:req.user.facility
      });  
})

const deleteFacility = asyncErrorWrapper(async (req,res,next)=>{

  Usermodels.updateMany({_id:req.user.id}, { $pull: {facility:{ facilityId: "" }} }).exec();
  res.status(200).json({
      success: true,
      message: "facility delete successfull",
    });  
})

const findObjectName = asyncErrorWrapper( async(req,res,next)=>{



  // const result = Usermodels.find({ facility: "Scope-1"});
  // const result = Usermodels.find({ facility : { $elemMatch: { name: "Scope-1" }}});
  const followedUsers = Usermodels.find({"facility.data":"Scope-1"})

  console.log(followedUsers);

  // console.log("result",result)
  
    res
    .json({
      success:true,
      message:'yes two Object name is equal',
    })
})

const getAllFacility = asyncErrorWrapper(async (req,res,next)=>{
  // const veriall = await Data.find().exec();
  // const veriall = await Data.find({"tesis":"ASELSAN ANKARA SUBE"}).exec();

  // CALISIYOR
  // const veriall = await Data.find({title:'Scope-2'}).exec();

    const veriall = await Data.findOne({user:req.user.id},{tesis:"ASELSAN KONYA SUBE"}).exec();


  res
  .json({
    success:true,
    message:'All facility successful',
    data:veriall
  })
})

module.exports = {
  updateFacility,
  addedFacility,
  deleteFacility,
  findObjectName,
  getAllFacility
}

