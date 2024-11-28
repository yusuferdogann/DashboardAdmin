const asyncErrorWrapper = require("express-async-handler");
const Usermodels = require("../../models/User");
const ScopeModel = require("../../models/scopes");
const FacilityModel = require("../../models/facility")
var ObjectId = require('mongoose').Types.ObjectId; 

const express = require('express');

var app = express();
  app.locals.data = {};


globalThis.globalVariable;
const updateFacility = asyncErrorWrapper(async (req, res, next) => {

  // const name = 'yalan'
  // const id = '6736457cd4aa767c3e9d8e69'
  const {id,title} = req.body
  let facility = await FacilityModel.findById(id)

  facility.facilityname = title;
  facility = await facility.save();


  res.status(200).json({
    success: true,
    message: "facility upload successfull",
    // data: facility,
  });
});

const addedFacility = asyncErrorWrapper(async (req, res, next) => {
  const id = await Usermodels.findById(req.user.id);

  // const item = ({
  //   city,
  //   country,
  //   employeecount,
  //   facilityname,
  //   state,
  //   totalarea,
  // } = req.body);

  // Usermodels.findByIdAndUpdate(id, { $push: { facility: item } }).exec();


  const { city, country, employeecount, facilityname, state, totalarea} = req.body
  const facility = await FacilityModel.create({
    city,
    country,
    employeecount,
    facilityname,
    state,
    totalarea,
    userId:req.user.id
  })


  res.status(200).json({
    success: true,
    message: "facility add successfull",
    data:facility
  });
});

const deleteFacility = asyncErrorWrapper(async (req, res, next) => {
  // Usermodels.updateMany({_id:req.user.id}, { $pull: {facility:{ facilityId: "" }} }).exec();
  res.status(200).json({
    success: true,
    message: "facility delete successfull",
  });
});

const getOneFacility = asyncErrorWrapper(async(req,res,next)=>{

  const {tesisName} = req.body;

  req.app.locals.data = req.body;

  const globalVariable = tesisName

  // console.log("get name--------",globalVariable)

  res.json({
    success:true,
    message:'get one facility',
    data:tesisName
  })
})


const findObjectName = asyncErrorWrapper(async (req, res, next) => {
  // const result = Usermodels.find({ facility: "Scope-1"});
  // const result = Usermodels.find({ facility : { $elemMatch: { name: "Scope-1" }}});
  const followedUsers = Usermodels.find({ "facility.data": "Scope-1" });

  // console.log(followedUsers);

  // console.log("result",result)

  res.json({
    success: true,
    message: "yes two Object name is equal",
  });
});

const getAllFacility = asyncErrorWrapper(async (req, res, next) => {
  // const veriall = await Data.find().exec();
  // const veriall = await Data.find({"tesis":"ASELSAN ANKARA SUBE"}).exec();

  // CALISIYOR
  // const veriall = await Data.find({title:'Scope-2'}).exec();

  // <CALISIYOR> Facilities data bolumunde tesise ve kulanici ID ye gore cekiyor
  // const veriall = await Data.findOne({user:req.user.id},{tesis:"ASELSAN KONYA SUBE"}).exec();

  // Usermodels.findById(id, { $push: { facility: item } }).exec();
  // ===================
  //   const id = await Usermodels.findById(req.user.id)

  //  const veriall = await Usermodels.aggregate([
  //   {$unwind:"$facility"},
  // ])

  const id = await Usermodels.findById(req.user.id);

  Usermodels.findByIdAndUpdate(id, { $all: { facility } }).exec();

  res.status(200).json({
    success: true,
    message: "facility get all successfull",
    // data:req.user.facility
  });

  res.json({
    success: true,
    message: "All facility successful",
    data: veriall,
  });
});

const filterFacilityByUserId = asyncErrorWrapper(async (req,res,next)=>{


  const id = req.user.id
  // console.log("userid---------------------------",userId)
// const filterfacility = await FacilityModel.findById(userId).populate("userId").exec()
  // const veriall = await FacilityModel.findById(userId, { $where: { facility: item } }).exec();


  const veriall = await FacilityModel.find({userId:id}).exec();



  res
  .json({
    success:true,
    message:"ok filter of user ID",
    data:veriall
  })
})

const filterAmountByUserId = asyncErrorWrapper(async (req,res,next)=>{
  // iki sorgu arasinda daglar kadar fark var <SORGU-1>
  // var filterfacility = await ScopeModel.find({user:id},{title:"Scope-2"}).select("miktar ");
  
  // iki sorgu arasinda daglar kadar fark var <SORGU-2>
  // var filterfacility = await ScopeModel.find({user:req.user.id},{title:"Scope-1"}).exec();

  // <SORGU-3>
  var Scope1 = await ScopeModel.find({title:'Scope-1',situation:"Kasım"}).select("miktar").exec();
  var Scope2 = await ScopeModel.find({title:'Scope-2',situation:"Kasım"}).select("miktar").exec();

  res
  .json({
    success:true,
    message:"ok filter of mount",
    data:{
      Scope1:Scope1,
      Scope2:Scope2
    }
  })
})

const summaryFilterData    = asyncErrorWrapper( async(req,res,next)=>{

  const {ScopeTitle,Situation,Subtitle} = req.body
  // console.log(ScopeTitle)

  var SummaryData = await ScopeModel.find({title:ScopeTitle,situation:Situation,subtitle:Subtitle}).exec();

  res.json({
    success:true,
    message:'ok that right get all summary data successfully',
    data:SummaryData
  })
})
const summaryFilterSubData = asyncErrorWrapper( async(req,res,next)=>{

  const {ScopeTitle,Situation,Subtitle,TravelType} = req.body
  // console.log(req.body)

  var SummaryData = await ScopeModel.find({title:ScopeTitle,situation:Situation,subtitle:Subtitle,type:TravelType}).exec();

  res.json({
    success:true,
    message:'ok that right get all summary data successfully',
    data:SummaryData
  })
})

const DashboardMounthGrafic = asyncErrorWrapper(async(req,res,next)=>{

  const {ScopeTitle,Situation,Subtitle} = req.body

  const tesisName = req.app.locals.data.tesisName


// {ScopeTitle: 'SCOPE-1', Situation: 'Kasım', Subtitle: 'SABIT YANMA'}

  // <SORGU-1>
  // var Scope1Kasim = await ScopeModel.find({title:"SCOPE-1",situation:'Kasım'},{miktar:{$sum:{$toInt:"$miktar"}}}).exec();
  // <SORGU-2>
  // var Scope1Kasim = await ScopeModel.aggregate([{$group:{"_id":{"title":"SCOPE-1","situation":"Kasım"},"miktar":{$sum:{$toInt:"$miktar"}}}}]);
  // <SORGU-3>
  var Scope1Ocak  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-1', situation: "Ocak"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Subat  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-1', situation: "Şubat"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Mart  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-1', situation: "Mart"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Nisan  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-1', situation: "Nisan"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Mayis  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-1', situation: "Mayıs"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Haziran  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-1', situation: "Haziran"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Temmuz  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-1', situation: "Temmuz"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Agustos  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-1', situation: "Ağustos"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Eylul  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-1', situation: "Eylül"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Ekim  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-1', situation: "Ekim"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Kasim = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-1', situation: "Kasım"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Aralik  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-1', situation: "Aralık"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])

  var Scope2Ocak  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-2', situation: "Ocak"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope2Subat  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-2', situation: "Şubat"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope2Mart  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-2', situation: "Mart"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope2Nisan  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-2', situation: "Nisan"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope2Mayis  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-2', situation: "Mayıs"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope2Haziran  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-2', situation: "Haziran"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope2Temmuz  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-2', situation: "Temmuz"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope2Agustos  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-2', situation: "Ağustos"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope2Eylul  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-2', situation: "Eylül"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope2Ekim  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-2', situation: "Ekim"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope2Kasim = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-2', situation: "Kasım"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope2Aralik  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-2', situation: "Aralık"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])


  var Scope3Ocak  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-3', situation: "Ocak"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope3Subat  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-3', situation: "Şubat"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope3Mart  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-3', situation: "Mart"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope3Nisan  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-3', situation: "Nisan"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope3Mayis  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-3', situation: "Mayıs"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope3Haziran  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-3', situation: "Haziran"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope3Temmuz  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-3', situation: "Temmuz"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope3Agustos  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-3', situation: "Ağustos"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope3Eylul  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-3', situation: "Eylül"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope3Ekim  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-3', situation: "Ekim"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope3Kasim = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-3', situation: "Kasım"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope3Aralik  = await ScopeModel.aggregate([{$match : {tesis:tesisName,title: 'SCOPE-3', situation: "Aralık"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])


  const Ocak  = Scope1Ocak[0]?.miktar;
  const Subat = Scope1Subat[0]?.miktar;
  const Mart  = Scope1Mart[0]?.miktar;
  const Nisan = Scope1Nisan[0]?.miktar;
  const Mayis = Scope1Mayis[0]?.miktar;
  const Haziran =  Scope1Haziran[0]?.miktar;
  const Temmuz =  Scope1Temmuz[0]?.miktar;
  const Agustos =  Scope1Agustos[0]?.miktar;
  const Eylul =  Scope1Eylul[0]?.miktar;
  const Ekim = Scope1Ekim[0]?.miktar;
  const Kasim = Scope1Kasim[0]?.miktar;
  const Aralik = Scope1Aralik[0]?.miktar;

  const Ocak2  = Scope2Ocak[0]?.miktar;
  const Subat2 = Scope2Subat[0]?.miktar;
  const Mart2  = Scope2Mart[0]?.miktar;
  const Nisan2 = Scope2Nisan[0]?.miktar;
  const Mayis2 = Scope2Mayis[0]?.miktar;
  const Haziran2 =  Scope2Haziran[0]?.miktar;
  const Temmuz2 =  Scope2Temmuz[0]?.miktar;
  const Agustos2 =  Scope2Agustos[0]?.miktar;
  const Eylul2 =  Scope2Eylul[0]?.miktar;
  const Ekim2 = Scope2Ekim[0]?.miktar;
  const Kasim2 = Scope2Kasim[0]?.miktar;
  const Aralik2 = Scope2Aralik[0]?.miktar;

  const Ocak3  = Scope3Ocak[0]?.miktar;
  const Subat3 = Scope3Subat[0]?.miktar;
  const Mart3  = Scope3Mart[0]?.miktar;
  const Nisan3 = Scope3Nisan[0]?.miktar;
  const Mayis3 = Scope3Mayis[0]?.miktar;
  const Haziran3 =  Scope3Haziran[0]?.miktar;
  const Temmuz3 =  Scope3Temmuz[0]?.miktar;
  const Agustos3 =  Scope3Agustos[0]?.miktar;
  const Eylul3 =  Scope3Eylul[0]?.miktar;
  const Ekim3 = Scope3Ekim[0]?.miktar;
  const Kasim3 = Scope3Kasim[0]?.miktar;
  const Aralik3 = Scope3Aralik[0]?.miktar;

  const Scope1GrafikData = [Ocak,Subat,Mart,Nisan,Mayis,Haziran,Temmuz,Agustos,Eylul,Ekim,Kasim,Aralik]
  const Scope2GrafikData = [Ocak2,Subat2,Mart2,Nisan2,Mayis2,Haziran2,Temmuz2,Agustos2,Eylul2,Ekim2,Kasim2,Aralik2]
  const Scope3GrafikData = [Ocak3,Subat3,Mart3,Nisan3,Mayis3,Haziran3,Temmuz3,Agustos3,Eylul3,Ekim3,Kasim3,Aralik3]

    // console.log("Result-------------------",Scope1Ocak[0].miktar)
    // console.log(Scope1GrafikData)


  res.json({
    success:true,
    message:'Successfly dashboard Grafic data',
    data:{Scope1GrafikData,Scope2GrafikData,Scope3GrafikData}
  })
})

const DashboardFacilityGrafic = asyncErrorWrapper(async(req,res,next)=>{

  const id = req.user.id

  const veriall = await FacilityModel.find({userId:id}).exec();
  const ResultData = []
  for (let i = 0; i < veriall.length; i++) {
    const element = veriall[i].facilityname;
    // console.log(element)
      var FacilityScope1  = await ScopeModel.aggregate([{$match : {tesis: element}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
      // console.log(FacilityScope1[0]?.miktar)
      if(FacilityScope1[0]?.miktar === null || FacilityScope1[0]?.miktar === undefined){
        ResultData.push(Number(0))
      }
      else{
        ResultData.push(FacilityScope1[0]?.miktar)
      }
        
  }

  // var FacilityScope1  = await ScopeModel.aggregate([{$match : {tesis: "deneme 666"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])


  res.json({
    success:true,
    message:"ok that right facility grafic",
    data:ResultData
  })
})

const DashboardScopeGrafic = asyncErrorWrapper(async(req,res,next)=>{

  const {id} = req.user.id
  // console.log('id-----------------',req.user.id)
  // console.log("Scope-----------",JSON.stringify(req.app.locals.data.tesisName) )
  const tesisName = req.app.locals.data.tesisName
  // console.log("userdata",userId)
  // 671f625e6fb5f4cad2600c7c yusuf
  // 672c82e62190de415f3b083c ayse

  // sadece tam sayilari toplama $toInt
  // var CardScope1  = await ScopeModel.aggregate([{$match : {user: new ObjectId(req.user.id),title: "SCOPE-1",tesis:'telefon'}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}} }} ])
  // var CardScope2  = await ScopeModel.aggregate([{$match : {user: new ObjectId(req.user.id),title: "SCOPE-2",tesis:'telefon'}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}} }} ])
  // var CardScope3  = await ScopeModel.aggregate([{$match : {user: new ObjectId(req.user.id),title: "SCOPE-3",tesis:'telefon'}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}} }} ])


  var CardScope1  = await ScopeModel.aggregate([{$match : {user: new ObjectId(req.user.id),title: "SCOPE-1",tesis:tesisName}},{$group: {_id : null, miktar: {$sum:"$miktar"} }} ])
  var CardScope2  = await ScopeModel.aggregate([{$match : {user: new ObjectId(req.user.id),title: "SCOPE-2",tesis:tesisName}},{$group: {_id : null, miktar: {$sum:"$miktar"} }} ])
  var CardScope3  = await ScopeModel.aggregate([{$match : {user: new ObjectId(req.user.id),title: "SCOPE-3",tesis:tesisName}},{$group: {_id : null, miktar: {$sum:"$miktar"} }} ])


  res.json({
    success:true,
    message:'ok successfuly Card Scope detail',
    data:{CardScope1,CardScope2,CardScope3}
      
    
  })


})

const DashboardWeekGrafic = asyncErrorWrapper(async(req,res,next)=>{
  // ===========================gecmis haftayi buluyor=================
  let currentDate = new Date();
  let currentDateMs = currentDate.getTime();
  let dayNumber = (currentDate.getDay() + 6) % 6;
  let result = currentDateMs - 86400000 * dayNumber; 
  let resultDate = new Date(result);

// console.log(resultDate.toDateString());
// ====================================================================

// ======================gelecek ve buhaftayi bluyor========================
// var needDay = 0;
// var Pazartesi = new Date();
//  Pazartesi.setDate(Pazartesi.getDate() + (2 - Pazartesi.getDay()) + needDay)

// console.log(Pazartesi);
// var currentDate2 = new Date();
// ==================================================================================
// var today = new Date();
// var day = today.getDay() || 7; // Get current day number, converting Sun. to 7
// if (day !== 1) // Only manipulate the date if it isn't Mon.
//   today.setHours(-24 * (day - 1)); // Set the hours to day number minus 1
// //   multiplied by negative 24
// console.log("TODAY-----------------",today); // will be Monday
// ==================================================================================
//returns the relative day in the week 0 = Sunday, 1 = Monday ... 6 = Saturday
function getRelativeDayInWeek(d,dy) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:dy); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

var pazartesi = getRelativeDayInWeek(new Date(),1);
var sali = getRelativeDayInWeek(new Date(),2);
var carsamba = getRelativeDayInWeek(new Date(),3);
var persembe = getRelativeDayInWeek(new Date(),4);
var cuma = getRelativeDayInWeek(new Date(),5);
var cumartesi = getRelativeDayInWeek(new Date(),6);
var pazar = getRelativeDayInWeek(new Date(),7);

const newPazartesi = pazartesi.toLocaleDateString().split(".").join("/")
const newSali = sali.toLocaleDateString().split(".").join("/")
const newCarsamba = carsamba.toLocaleDateString().split(".").join("/")
const newPersembe = persembe.toLocaleDateString().split(".").join("/")
const newCuma = cuma.toLocaleDateString().split(".").join("/")
const newCumartesi = cumartesi.toLocaleDateString().split(".").join("/")
const newPazar = pazar.toLocaleDateString().split(".").join("/")

// console.log("PAZARTESEI------",pazar.toLocaleDateString().split(".").join("/"));

// console.log("sali",sali);
// console.log(friday.toISOString().substring(0,10));
// const fridayResult = friday.toISOString().substring(0,10)

// console.log("sali----",newSali)



// =========================================================================================================
// var my_date = new Date();
// var Pazartesi = (my_date.getDate() + 0) + "/" + (my_date.getMonth()+1) + "/" + my_date.getFullYear();
// var Sali      = (my_date.getDate() + 1) + "/" + (my_date.getMonth()+1) + "/" + my_date.getFullYear();
// var Carsamba  = (my_date.getDate() + 2) + "/" + (my_date.getMonth()+1) + "/" + my_date.getFullYear();
// var Persembe  = (my_date.getDate() + 3) + "/" + (my_date.getMonth()+1) + "/" + my_date.getFullYear();
// var Cuma      = (my_date.getDate() + 4) + "/" + (my_date.getMonth()+1) + "/" + my_date.getFullYear();
// var Cumartesi = (my_date.getDate() + 5) + "/" + (my_date.getMonth()+1) + "/" + my_date.getFullYear();
// var Pazar     = (my_date.getDate() + 6) + "/" + (my_date.getMonth()+1) + "/" + my_date.getFullYear();
// ---------------------------------------------------------------------------------------------------------
// const date = new Date();

// const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const currentDayOfWeek = daysOfWeek[date.getDay()];

// const currentTime = date.toLocaleTimeString();

// // console.log(`Today is ${currentDayOfWeek} and the time is ${currentTime}`);
// ==========================================================================================================

// console.log(Pazartesi,Sali,Carsamba,Persembe,Cuma,Cumartesi,Pazar);
// console.log(weekday[0]);
const tesisName = req.app.locals.data.tesisName

var GrafPazartesi_Ocak_Mart  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Ocak - Mart",tarih:newPazartesi}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafSali_Ocak_Mart  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Ocak - Mart",tarih:newSali}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafCarsamba_Ocak_Mart  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Ocak - Mart",tarih:newCarsamba}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafPersembe_Ocak_Mart  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Ocak - Mart",tarih:newPersembe}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafCuma_Ocak_Mart  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Ocak - Mart",tarih:newCuma}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafCumartesi_Ocak_Mart  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Ocak - Mart",tarih:newCumartesi}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafPazar_Ocak_Mart  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Ocak - Mart",tarih:newPazar}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])

var GrafPazartesi_Nisan_Haziran  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Nisan - Haziran",tarih:newPazartesi}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafSali_Nisan_Haziran  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Nisan - Haziran",tarih:newSali}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafCarsamba_Nisan_Haziran  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Nisan - Haziran",tarih:newCarsamba}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafPersembe_Nisan_Haziran  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Nisan - Haziran",tarih:newPersembe}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafCuma_Nisan_Haziran  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Nisan - Haziran",tarih:newCuma}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafCumartesi_Nisan_Haziran  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Nisan - Haziran",tarih:newCumartesi}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafPazar_Nisan_Haziran  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Nisan - Haziran",tarih:newPazar}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])

var GrafPazartesi_Temmuz_Eylul  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Temmuz - Eylul",tarih:newPazartesi}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafSali_Temmuz_Eylul  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Temmuz - Eylul",tarih:newSali}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafCarsamba_Temmuz_Eylul  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Temmuz - Eylul",tarih:newCarsamba}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafPersembe_Temmuz_Eylul  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Temmuz - Eylul",tarih:newPersembe}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafCuma_Temmuz_Eylul  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Temmuz - Eylul",tarih:newCuma}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafCumartesi_Temmuz_Eylul  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Temmuz - Eylul",tarih:newCumartesi}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafPazar_Temmuz_Eylul  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Temmuz - Eylul",tarih:newPazar}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])

var GrafPazartesi_Ekim_Aralik  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Ekim - Aralık",tarih:newPazartesi}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafSali_Ekim_Aralik  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Ekim - Aralık",tarih:newSali}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafCarsamba_Ekim_Aralik  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Ekim - Aralık",tarih:newCarsamba}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafPersembe_Ekim_Aralik  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Ekim - Aralık",tarih:newPersembe}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafCuma_Ekim_Aralik  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Ekim - Aralık",tarih:newCuma}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafCumartesi_Ekim_Aralik  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Ekim - Aralık",tarih:newCumartesi}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafPazar_Ekim_Aralik  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: "Ekim - Aralık",tarih:newPazar}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])


// console.log(GrafPazartesi_Ocak_Mart[0]?.miktar)
// console.log(GrafSali_Ocak_Mart[0]?.miktar)
// console.log(GrafCarsamba_Ocak_Mart[0]?.miktar)
// console.log(GrafPersembe_Ocak_Mart[0]?.miktar)
// console.log(GrafCuma_Ocak_Mart[0]?.miktar)
// console.log(GrafCumartesi_Ocak_Mart[0]?.miktar)
// console.log(GrafPazar_Ocak_Mart[0]?.miktar)


const Ocak_Mart = [GrafPazartesi_Ocak_Mart[0]?.miktar,GrafSali_Ocak_Mart[0]?.miktar,GrafCarsamba_Ocak_Mart[0]?.miktar,GrafPersembe_Ocak_Mart[0]?.miktar,GrafCuma_Ocak_Mart[0]?.miktar,GrafCumartesi_Ocak_Mart[0]?.miktar,GrafPazar_Ocak_Mart[0]?.miktar];
const Nisan_Haziran = [GrafPazartesi_Nisan_Haziran[0]?.miktar,GrafSali_Nisan_Haziran[0]?.miktar,GrafCarsamba_Nisan_Haziran[0]?.miktar,GrafPersembe_Nisan_Haziran[0]?.miktar,GrafCuma_Nisan_Haziran[0]?.miktar,GrafCumartesi_Nisan_Haziran[0]?.miktar,GrafPazar_Nisan_Haziran[0]?.miktar];
const Temmuz_Eylul = [GrafPazartesi_Temmuz_Eylul[0]?.miktar,GrafSali_Temmuz_Eylul[0]?.miktar,GrafCarsamba_Temmuz_Eylul[0]?.miktar,GrafPersembe_Temmuz_Eylul[0]?.miktar,GrafCuma_Temmuz_Eylul[0]?.miktar,GrafCumartesi_Temmuz_Eylul[0]?.miktar,GrafPazar_Temmuz_Eylul[0]?.miktar];
const Ekim_Aralik = [GrafPazartesi_Ekim_Aralik[0]?.miktar,GrafSali_Ekim_Aralik[0]?.miktar,GrafCarsamba_Ekim_Aralik[0]?.miktar,GrafPersembe_Ekim_Aralik[0]?.miktar,GrafCuma_Ekim_Aralik[0]?.miktar,GrafCumartesi_Ekim_Aralik[0]?.miktar,GrafPazar_Ekim_Aralik[0]?.miktar];




res.json({
  success:true,
  data:
    { Ocak_Mart,
    Nisan_Haziran,
    Temmuz_Eylul,
    Ekim_Aralik}
  
})
})

const ReportPeriodData = asyncErrorWrapper(async(req,res,next)=>{

  const tesisName = req.app.locals.data.tesisName


  var ReportPeriod_Ocak_Mart1 = await ScopeModel.aggregate([{$match : {title:'SCOPE-1', tesis: tesisName, situation: "Ocak-Mart"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var ReportPeriod_Nisan_Haziran1 = await ScopeModel.aggregate([{$match : {title:'SCOPE-1', tesis: tesisName, situation: "Nisan-Haziran"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var ReportPeriod_Temmuz_Eylul1 = await ScopeModel.aggregate([{$match : {title:'SCOPE-1', tesis: tesisName, situation: "Temmuz-Eylul"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var ReportPeriod_Ekim_Aralik1  = await ScopeModel.aggregate([{$match : {title:'SCOPE-1',tesis: tesisName, situation: "Ekim-Aralik"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])

  var ReportPeriod_Ocak_Mart2 = await ScopeModel.aggregate([{$match : {title:'SCOPE-2', tesis: tesisName, situation: "Ocak-Mart"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var ReportPeriod_Nisan_Haziran2 = await ScopeModel.aggregate([{$match : {title:'SCOPE-2', tesis: tesisName, situation: "Nisan-Haziran"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var ReportPeriod_Temmuz_Eylul2 = await ScopeModel.aggregate([{$match : {title:'SCOPE-2', tesis: tesisName, situation: "Temmuz-Eylul"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var ReportPeriod_Ekim_Aralik2  = await ScopeModel.aggregate([{$match : {title:'SCOPE-2',tesis: tesisName, situation: "Ekim-Aralik"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])

  var ReportPeriod_Ocak_Mart3 = await ScopeModel.aggregate([{$match : {title:'SCOPE-3', tesis: tesisName, situation: "Ocak-Mart"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var ReportPeriod_Nisan_Haziran3 = await ScopeModel.aggregate([{$match : {title:'SCOPE-3', tesis: tesisName, situation: "Nisan-Haziran"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var ReportPeriod_Temmuz_Eylul3 = await ScopeModel.aggregate([{$match : {title:'SCOPE-3', tesis: tesisName, situation: "Temmuz-Eylul"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var ReportPeriod_Ekim_Aralik3  = await ScopeModel.aggregate([{$match : {title:'SCOPE-3',tesis: tesisName, situation: "Ekim-Aralik"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])


  res.json({
    success:true,
    data:{
      KAPSAM1:[ReportPeriod_Ocak_Mart1,ReportPeriod_Nisan_Haziran1,ReportPeriod_Temmuz_Eylul1,ReportPeriod_Ekim_Aralik1],
      KAPSAM2:[ReportPeriod_Ocak_Mart2,ReportPeriod_Nisan_Haziran2,ReportPeriod_Temmuz_Eylul2,ReportPeriod_Ekim_Aralik2],
      KAPSAM3:[ReportPeriod_Ocak_Mart3,ReportPeriod_Nisan_Haziran3,ReportPeriod_Temmuz_Eylul3,ReportPeriod_Ekim_Aralik3]

    
    }
    

  })
})

const DeletedFacility = asyncErrorWrapper(async(req,res,next)=>{

const {idDeletedFacility} = req.body

// console.log("data----------",idDeletedFacility)
const deletedData = await FacilityModel.findByIdAndDelete({_id: new ObjectId(idDeletedFacility)})

res.json({
  success:true,
  // data:deletedData
})
})

const GetAllScopeByDateOfDaily = asyncErrorWrapper(async(req,res,next)=>{

  const tesisName = req.app.locals.data.tesisName


  var currentdate = new Date(); 
  var datetime =    currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() 

  var DailyScope = await ScopeModel.find({tesis:tesisName,tarih:datetime}).exec();

  res.json({
    success:true,
    data:DailyScope
  })
})

const DeletedScope = asyncErrorWrapper(async(req,res,next)=>{

  const {deleteScopeId} = req.body
// console.log("deleed-id------",deleteScopeId)

  const deletedData = await ScopeModel.findByIdAndDelete({_id: new ObjectId(deleteScopeId)})

  res.json({
    success:true,
    data:deletedData
  })
})

module.exports = {
  updateFacility,
  addedFacility,
  deleteFacility,
  findObjectName,
  getAllFacility,
  filterFacilityByUserId,
  filterAmountByUserId,
  summaryFilterData,
  DashboardMounthGrafic,
  DashboardFacilityGrafic,
  DashboardScopeGrafic,
  DashboardWeekGrafic,
  DeletedFacility,
  summaryFilterSubData,
  ReportPeriodData,
  GetAllScopeByDateOfDaily,
  DeletedScope,
  getOneFacility
};
