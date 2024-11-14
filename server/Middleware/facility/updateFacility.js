const asyncErrorWrapper = require("express-async-handler");
const Usermodels = require("../../models/User");
const ScopeModel = require("../../models/scopes");
const FacilityModel = require("../../models/facility")
const { data } = require("../../controllers/DataController");
const uniqid = require("uniqid");
const useState = require('react')
// var ObjectId = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose');
// const { MongoClient,  ObjectId } = require("mongodb");
var ObjectId = require('mongoose').Types.ObjectId; 





const updateFacility = asyncErrorWrapper(async (req, res, next) => {
  const user = await Usermodels.findByIdAndUpdate(
    req.user.id,
    {
      facility: [
        {
          scope1: {
            name: "Scope-1",
            states: [
              {
                id: 1,
                name: "SABIT YANMA",
                short: ["sabit"],
                data: [
                  { kaynak: "buzdolabi", birim: "megawatt", miktar: "1000m3" },
                ],
              },
              {
                id: 2,
                name: "HAREKETLI YANMA",
                short: ["hareketli"],
                data: [
                  { kaynak: "buzdolabi", birim: "megawatt", miktar: "1000m3" },
                ],
              },
              {
                id: 3,
                name: "DOGRUDAN SIZMA KACAK EMISYONU",
                short: ["dogrudan"],
                data: [
                  { kaynak: "buzdolabi", birim: "megawatt", miktar: "1000m3" },
                ],
              },
            ],
          },
          scope2: {
            states: [
              {
                id: 1,
                name: "Satın Alınan Enerji",
                data: [
                  { name: "buzdolabi", birim: "megawatt", miktar: "1000m3" },
                  {
                    name: "derin dondurucu",
                    birim: "kilowatt",
                    miktar: "350m3",
                  },
                ],
              },
            ],
          },
          scope3: {
            states: [
              {
                id: 1,
                name: "Upstream Nakliye (aracın firmaya ait olması durumunda)",
                data: [
                  {
                    aracturu: "otobus",
                    yakitturu: "dizel",
                    birim: "lt",
                    miktar: "400",
                  },
                ],
              },
              {
                id: 2,
                name: "Downstream Nakliye hizmetin dışardan satın alınması durumunda)",
                data: [
                  {
                    sahsiaraclar: [
                      {
                        aracturu: "otobus",
                        yakitturu: "dizel",
                        birim: "lt",
                        miktar: "400",
                      },
                    ],
                    servisaraclar: [
                      {
                        aracturu: "otobus",
                        yakitturu: "dizel",
                        birim: "lt",
                        miktar: "400",
                      },
                    ],
                    musteriziyareti: [
                      {
                        aracturu: "otobus",
                        yakitturu: "dizel",
                        birim: "lt",
                        miktar: "400",
                      },
                    ],
                    isseyahatlari: [
                      {
                        aracturu: "otobus",
                        yakitturu: "dizel",
                        birim: "lt",
                        miktar: "400",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "facility upload successfull",
    data: user,
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

const summaryFilterData = asyncErrorWrapper( async(req,res,next)=>{

  const {ScopeTitle,Situation,Subtitle} = req.body
  // console.log(ScopeTitle)

  var SummaryData = await ScopeModel.find({title:ScopeTitle,situation:Situation,subtitle:Subtitle}).exec();

  res.json({
    success:true,
    message:'ok that right get all summary data successfully',
    data:SummaryData
  })
})

const DashboardMounthGrafic = asyncErrorWrapper(async(req,res,next)=>{

  const {ScopeTitle,Situation,Subtitle} = req.body

// {ScopeTitle: 'SCOPE-1', Situation: 'Kasım', Subtitle: 'SABIT YANMA'}

  // <SORGU-1>
  // var Scope1Kasim = await ScopeModel.find({title:"SCOPE-1",situation:'Kasım'},{miktar:{$sum:{$toInt:"$miktar"}}}).exec();
  // <SORGU-2>
  // var Scope1Kasim = await ScopeModel.aggregate([{$group:{"_id":{"title":"SCOPE-1","situation":"Kasım"},"miktar":{$sum:{$toInt:"$miktar"}}}}]);
  // <SORGU-3>
  var Scope1Ocak  = await ScopeModel.aggregate([{$match : {title: 'SCOPE-1', situation: "Ocak"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Subat  = await ScopeModel.aggregate([{$match : {title: 'SCOPE-1', situation: "Şubat"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Mart  = await ScopeModel.aggregate([{$match : {title: 'SCOPE-1', situation: "Mart"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Nisan  = await ScopeModel.aggregate([{$match : {title: 'SCOPE-1', situation: "Nisan"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Mayis  = await ScopeModel.aggregate([{$match : {title: 'SCOPE-1', situation: "Mayıs"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Haziran  = await ScopeModel.aggregate([{$match : {title: 'SCOPE-1', situation: "Haziran"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Temmuz  = await ScopeModel.aggregate([{$match : {title: 'SCOPE-1', situation: "Temmuz"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Agustos  = await ScopeModel.aggregate([{$match : {title: 'SCOPE-1', situation: "Ağustos"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Eylul  = await ScopeModel.aggregate([{$match : {title: 'SCOPE-1', situation: "Eylül"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Ekim  = await ScopeModel.aggregate([{$match : {title: 'SCOPE-1', situation: "Ekim"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Kasim = await ScopeModel.aggregate([{$match : {title: 'SCOPE-1', situation: "Kasım"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var Scope1Aralik  = await ScopeModel.aggregate([{$match : {title: 'SCOPE-1', situation: "Aralık"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])

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

  const Scope1GrafikData = [Ocak,Subat,Mart,Nisan,Mayis,Haziran,Temmuz,Agustos,Eylul,Ekim,Kasim,Aralik]
    // console.log("Result-------------------",Scope1Ocak[0].miktar)
    // console.log(Scope1GrafikData)


  res.json({
    success:true,
    message:'Successfly dashboard Grafic data',
    data:Scope1GrafikData
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

  const id = req.user.id
  var CardScope1  = await ScopeModel.aggregate([{$match : {title: "SCOPE-1"}},{$group: {_id : id, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var CardScope2  = await ScopeModel.aggregate([{$match : {title: "SCOPE-2"}},{$group: {_id : id, miktar: {$sum:{$toInt:"$miktar"}}}}])
  var CardScope3  = await ScopeModel.aggregate([{$match : {title: "SCOPE-3"}},{$group: {_id : id, miktar: {$sum:{$toInt:"$miktar"}}}}])


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

console.log(newSali)



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

var GrafPazartesi_Ocak_Mart  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Ocak-Mart",tarih:newPazartesi}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafSali_Ocak_Mart  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Ocak-Mart",tarih:newSali}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafCarsamba_Ocak_Mart  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Ocak-Mart",tarih:newCarsamba}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafPersembe_Ocak_Mart  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Ocak-Mart",tarih:newPersembe}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafCuma_Ocak_Mart  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Ocak-Mart",tarih:newCuma}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafCumartesi_Ocak_Mart  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Ocak-Mart",tarih:newCumartesi}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
var GrafPazar_Ocak_Mart  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Ocak-Mart",tarih:newPazar}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])

// var GrafPazartesi_Nisan_Haziran  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Nisan-Haziran",tarih:Pazartesi}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafSali_Nisan_Haziran  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Nisan-Haziran",tarih:Sali}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafCarsamba_Nisan_Haziran  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Nisan-Haziran",tarih:Carsamba}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafPersembe_Nisan_Haziran  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Nisan-Haziran",tarih:Persembe}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafCuma_Nisan_Haziran  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Nisan-Haziran",tarih:Cuma}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafCumartesi_Nisan_Haziran  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Nisan-Haziran",tarih:Cumartesi}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafPazar_Nisan_Haziran  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Nisan-Haziran",tarih:Pazar}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])

// var GrafPazartesi_Temmuz_Eylul  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Temmuz_Eylul",tarih:Pazartesi}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafSali_Temmuz_Eylul  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Temmuz_Eylul",tarih:Sali}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafCarsamba_Temmuz_Eylul  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Temmuz_Eylul",tarih:Carsamba}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafPersembe_Temmuz_Eylul  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Temmuz_Eylul",tarih:Persembe}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafCuma_Temmuz_Eylul  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Temmuz_Eylul",tarih:Cuma}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafCumartesi_Temmuz_Eylul  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Temmuz_Eylul",tarih:Cumartesi}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafPazar_Temmuz_Eylul  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Temmuz_Eylul",tarih:Pazar}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])

// var GrafPazartesi_Ekim_Aralik  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Ekim_Aralik",tarih:Pazartesi}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafSali_Ekim_Aralik  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Ekim_Aralik",tarih:Sali}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafCarsamba_Ekim_Aralik  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Ekim_Aralik",tarih:Carsamba}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafPersembe_Ekim_Aralik  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Ekim_Aralik",tarih:Persembe}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafCuma_Ekim_Aralik  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Ekim_Aralik",tarih:Cuma}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafCumartesi_Ekim_Aralik  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Ekim_Aralik",tarih:Cumartesi}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])
// var GrafPazar_Ekim_Aralik  = await ScopeModel.aggregate([{$match : {tesis: 'deneme 666', situation: "Ekim_Aralik",tarih:Pazar}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])


console.log(GrafPazartesi_Ocak_Mart[0]?.miktar)
// console.log(GrafSali_Ocak_Mart[0]?.miktar)
// console.log(GrafCarsamba_Ocak_Mart[0]?.miktar)
// console.log(GrafPersembe_Ocak_Mart[0]?.miktar)
// console.log(GrafCuma_Ocak_Mart[0]?.miktar)
// console.log(GrafCumartesi_Ocak_Mart[0]?.miktar)
// console.log(GrafPazar_Ocak_Mart[0]?.miktar)


const Ocak_Mart = [GrafPazartesi_Ocak_Mart[0]?.miktar,GrafSali_Ocak_Mart[0]?.miktar,GrafCarsamba_Ocak_Mart[0]?.miktar,GrafPersembe_Ocak_Mart[0]?.miktar,GrafCuma_Ocak_Mart[0]?.miktar,GrafCumartesi_Ocak_Mart[0]?.miktar,GrafPazar_Ocak_Mart[0]?.miktar];
// const Nisan_Haziran = [GrafPazartesi_Nisan_Haziran,GrafSali_Nisan_Haziran,GrafCarsamba_Nisan_Haziran,GrafPersembe_Nisan_Haziran,GrafCuma_Nisan_Haziran,GrafCumartesi_Nisan_Haziran,GrafPazar_Nisan_Haziran];
// const Temmuz_Eylul = [GrafPazartesi_Temmuz_Eylul,GrafSali_Temmuz_Eylul,GrafCarsamba_Temmuz_Eylul,GrafPersembe_Temmuz_Eylul,GrafCuma_Temmuz_Eylul,GrafCumartesi_Temmuz_Eylul,GrafPazar_Temmuz_Eylul];
// const Ekim_Aralik = [GrafPazartesi_Ekim_Aralik,GrafSali_Ekim_Aralik,GrafCarsamba_Ekim_Aralik,GrafPersembe_Ekim_Aralik,GrafCuma_Ekim_Aralik,GrafCumartesi_Ekim_Aralik,GrafPazar_Ekim_Aralik];



res.json({
  success:true,
  data:
     Ocak_Mart,
    // Nisan_Haziran,
    // Temmuz_Eylul,
    // Ekim_Aralik
  
})
})

const DeletedFacility = asyncErrorWrapper(async(req,res,next)=>{

const {idDeletedFacility} = req.body

console.log("data----------",idDeletedFacility)
const deletedData = await FacilityModel.findByIdAndDelete({_id: new ObjectId(idDeletedFacility)})

res.json({
  success:true,
  // data:deletedData
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
  DeletedFacility
};
