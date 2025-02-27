const asyncErrorWrapper = require("express-async-handler");
const Usermodels = require("../../models/User");
const ScopeModel = require("../../models/scopes");
const FacilityModel = require("../../models/facility");
const FacilityInfoModel = require("../../models/facilitiyInfo");

var ObjectId = require("mongoose").Types.ObjectId;
const pool = require("../../config/database");
const xlsx = require("xlsx");
const multer = require("multer");
const path = require("path");

const express = require("express");

var app = express();
app.locals.data = {};

globalThis.globalVariable;

const updatedFacility = asyncErrorWrapper(async (req, res, next) => {
  const { _id, facilityname } = req.body;
  

  // Facility'yi id ile buluyoruz
  let facility = await FacilityModel.findById(_id);

  // Eğer facility bulunamazsa hata verelim
  if (!facility) {
    return res.status(404).json({
      success: false,
      message: "Facility not found"
    });
  }

  // Yalnızca 'facilityname' alanını güncelliyoruz, diğer alanlar mevcut değerleriyle kalır
  facility.facilityname = facilityname;

  // Diğer zorunlu alanları da korumak için mevcut verileri alıyoruz
  const updatedFacility = await facility.save();

  // Başarılı bir şekilde güncellenmişse
  res.status(200).json({
    success: true,
    message: "Facility name updated successfully",
    // data: updatedFacility
  });
});


const addedFacility = asyncErrorWrapper(async (req, res, next) => {
  // Kullanıcıyı bul
  const user = await Usermodels.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "Kullanıcı bulunamadı" });
  }

  // Eğer kullanıcı adminse, facilityLimit'i değiştirme
  if (user.role === "admin") {
    // Admin olduğunda facilityLimit azaltma işlemi yapılmaz
    const { city, country, employeecount, facilityname, company_logo, state, totalarea, latitude, longitude, CityCode, FieldActivity } = req.body;

    // Yeni tesis ekle
    const newFacility = await FacilityModel.create({
      city,
      country,
      employeecount,
      company_logo,
      facilityname,
      state,
      totalarea,
      latitude,
      longitude,
      CityCode,
      FieldActivity,
      userId: req.user.id,
    });

    await newFacility.save();

    return res.status(200).json({
      success: true,
      message: "Facility successfully added",
      data: newFacility,
    });
  }

  // Eğer facilityLimit 0 ise tesis ekleme
  if (user.facilityLimit <= 0) {
    return res.status(400).json({ message: "Limitiniz doldu! Yeni tesis ekleyemezsiniz." });
  }

  const { city, country, employeecount, facilityname, company_logo, state, totalarea, latitude, longitude, CityCode, FieldActivity } = req.body;

  // Yeni tesis ekle
  const newFacility = await FacilityModel.create({
    city,
    country,
    employeecount,
    company_logo,
    facilityname,
    state,
    totalarea,
    latitude,
    longitude,
    CityCode,
    FieldActivity,
    userId: req.user.id,
  });

  await newFacility.save();

  // Facility limitini azalt (admin değilse)
  user.facilityLimit -= 1;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Facility successfully added",
    data: newFacility,
  });
});


const checkFacilityLimit = asyncErrorWrapper(async (req,res,next)=>{


  const userId = await Usermodels.findById(req.user.id);
  const user = await Usermodels.findById(userId);
  if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
  }

  res.json({ facilityLimit: user.facilityLimit });


  console.error("Facility limit kontrol hatası:");
  res.status(500).json({ message: "Sunucu hatası" });
})
const checkReportLimit = asyncErrorWrapper(async (req,res,next)=>{


  const userId = await Usermodels.findById(req.user.id);
  const user = await Usermodels.findById(userId);
  console.log("userId-checkreportLimint--------",userId)
  if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
  }

  res.json({ reportLimit: user.reportLimit });


  console.error("Facility limit kontrol hatası:");
  res.status(500).json({ message: "Sunucu hatası" });
})
const getReportLimit = asyncErrorWrapper(async (req,res,next)=>{


  const userId = await Usermodels.findById(req.user.id);
  const user = await Usermodels.findById(userId);
  console.log("userId-checkreportLimint--------",userId)
  if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
  }

  res.json({ reportLimit: user.reportLimit });


  console.error("Facility limit kontrol hatası:");
  res.status(500).json({ message: "Sunucu hatası" });
})
const checkBalanceReport = asyncErrorWrapper(async (req, res, next) => {
  const userId = await Usermodels.findById(req.user.id);
  const user = await Usermodels.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "Kullanıcı bulunamadı" });
  }

  // Eğer kullanıcı admin ise, reportLimit'i azaltma
  if (user.role !== 'admin') {
    // ❌ Eğer reportLimit 0 ise işlem yapma
    if (user.reportLimit <= 0) {
      return res.status(400).json({ message: "Limitiniz doldu! Yeni tesis ekleyemezsiniz." });
    }

    // ✅ Report limitini azalt
    user.reportLimit -= 1;
    // ✅ Güncellenmiş kullanıcı verisini kaydet
    await user.save();
  }

  res.status(200).json({
    success: true,
    message: "Facility add successful",
  });
});

const getOneFacility = asyncErrorWrapper(async (req, res, next) => {
  const { tesisName, tesisNo } = req.body;

  req.app.locals.data = req.body;

  console.log("get name--------", req.body);

  res.json({
    success: true,
    message: "get one facility",
    data: tesisName,
  });
});

const imageUpload = asyncErrorWrapper(async (req, res, next) => {
  // console.log(req.body)
  const id = req.user.id;
  const tesisName = req.app.locals.data.tesisName;

  const { base64 } = req.body;

  // <SORGU - UPDATE - calisan 27.12.2024>
  //  const deneme = FacilityModel.findByIdAndUpdate(id,{company_logo:base64 } ).exec();

  // const user =  await Usermodels.findByIdAndUpdate(req.user.id,{"company_logo" : req.body}).exec()

  const user = await FacilityModel.find({
    userId: id,
    facilityname: tesisName,
  });

  console.log("image-----", tesisName);

  if (user) {
    FacilityModel.findOneAndUpdate(
      { facilityname: tesisName },
      { company_logo: base64 }
    ).exec();
    console.log("------updated-------");
  }

  res.status(200).json({
    success: true,
    message: "Image upload successfull",
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
    data: followedUsers,
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

const filterFacilityByUserId = asyncErrorWrapper(async (req, res, next) => {
  const id = req.user.id;
  // console.log("userid---------------------------",userId)
  // const filterfacility = await FacilityModel.findById(userId).populate("userId").exec()
  // const veriall = await FacilityModel.findById(userId, { $where: { facility: item } }).exec();

  const veriall = await FacilityModel.find({ userId: id });

  res.json({
    success: true,
    message: "ok filter of user ID",
    data: veriall,
  });
});

const getLogo = asyncErrorWrapper(async (req, res, next) => {
  // const tesisNo = req.app.locals.data.tesisNo

  const logodata = await FacilityModel.find({
    facilityname: "deneme 1",
  }).exec();

  const result = logodata?.company_logo;
  // console.log("logo--------",logodata)

  res.json({
    success: true,
    message: "ok filter of user ID",
    data: result,
  });
});
const filterAmountByUserId = asyncErrorWrapper(async (req, res, next) => {
  // iki sorgu arasinda daglar kadar fark var <SORGU-1>
  // var filterfacility = await ScopeModel.find({user:id},{title:"Scope-2"}).select("miktar ");

  // iki sorgu arasinda daglar kadar fark var <SORGU-2>
  // var filterfacility = await ScopeModel.find({user:req.user.id},{title:"Scope-1"}).exec();

  // <SORGU-3>
  var Scope1 = await ScopeModel.find({ title: "Scope-1", situation: "Kasım" })
    .select("miktar")
    .exec();
  var Scope2 = await ScopeModel.find({ title: "Scope-2", situation: "Kasım" })
    .select("miktar")
    .exec();

  res.json({
    success: true,
    message: "ok filter of mount",
    data: {
      Scope1: Scope1,
      Scope2: Scope2,
    },
  });
});

const summaryFilterData = asyncErrorWrapper(async (req, res, next) => {
  const { ScopeTitle, Situation, Subtitle } = req.body;
  // console.log(ScopeTitle)

  var SummaryData = await ScopeModel.find({
    title: ScopeTitle,
    situation: Situation,
    subtitle: Subtitle,
  }).exec();

  res.json({
    success: true,
    message: "ok that right get all summary data successfully",
    data: SummaryData,
  });
});
const summaryFilterSubData = asyncErrorWrapper(async (req, res, next) => {
  const { ScopeTitle, Situation, Subtitle, TravelType } = req.body;
  // console.log(req.body)

  var SummaryData = await ScopeModel.find({
    title: ScopeTitle,
    situation: Situation,
    subtitle: Subtitle,
    type: TravelType,
  }).exec();

  res.json({
    success: true,
    message: "ok that right get all summary data successfully",
    data: SummaryData,
  });
});

const DashboardMounthGrafic = asyncErrorWrapper(async (req, res, next) => {
  // const {ScopeTitle,Situation,Subtitle} = req.body

  const tesisName = req.app.locals.data.tesisName;

  // {ScopeTitle: 'SCOPE-1', Situation: 'Kasım', Subtitle: 'SABIT YANMA'}

  // <SORGU-1>
  // var Scope1Kasim = await ScopeModel.find({title:"SCOPE-1",situation:'Kasım'},{miktar:{$sum:{$toInt:"$miktar"}}}).exec();
  // <SORGU-2>
  // var Scope1Kasim = await ScopeModel.aggregate([{$group:{"_id":{"title":"SCOPE-1","situation":"Kasım"},"miktar":{$sum:{$toInt:"$miktar"}}}}]);
  // <SORGU-3>
  var Scope1Ocak = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-1", situation: "Ocak" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope1Subat = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-1", situation: "Şubat" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope1Mart = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-1", situation: "Mart" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope1Nisan = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-1", situation: "Nisan" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope1Mayis = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-1", situation: "Mayıs" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope1Haziran = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-1", situation: "Haziran" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope1Temmuz = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-1", situation: "Temmuz" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope1Agustos = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-1", situation: "Ağustos" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope1Eylul = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-1", situation: "Eylül" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope1Ekim = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-1", situation: "Ekim" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope1Kasim = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-1", situation: "Kasım" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope1Aralik = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-1", situation: "Aralık" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);

  var Scope2Ocak = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-2", situation: "Ocak" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope2Subat = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-2", situation: "Şubat" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope2Mart = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-2", situation: "Mart" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope2Nisan = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-2", situation: "Nisan" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope2Mayis = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-2", situation: "Mayıs" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope2Haziran = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-2", situation: "Haziran" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope2Temmuz = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-2", situation: "Temmuz" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope2Agustos = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-2", situation: "Ağustos" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope2Eylul = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-2", situation: "Eylül" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope2Ekim = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-2", situation: "Ekim" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope2Kasim = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-2", situation: "Kasım" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope2Aralik = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-2", situation: "Aralık" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);

  var Scope3Ocak = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-3", situation: "Ocak" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope3Subat = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-3", situation: "Şubat" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope3Mart = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-3", situation: "Mart" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope3Nisan = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-3", situation: "Nisan" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope3Mayis = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-3", situation: "Mayıs" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope3Haziran = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-3", situation: "Haziran" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope3Temmuz = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-3", situation: "Temmuz" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope3Agustos = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-3", situation: "Ağustos" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope3Eylul = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-3", situation: "Eylül" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope3Ekim = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-3", situation: "Ekim" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope3Kasim = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-3", situation: "Kasım" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);
  var Scope3Aralik = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, title: "SCOPE-3", situation: "Aralık" } },
    { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
  ]);

  const Ocak = Scope1Ocak[0]?.miktar;
  const Subat = Scope1Subat[0]?.miktar;
  const Mart = Scope1Mart[0]?.miktar;
  const Nisan = Scope1Nisan[0]?.miktar;
  const Mayis = Scope1Mayis[0]?.miktar;
  const Haziran = Scope1Haziran[0]?.miktar;
  const Temmuz = Scope1Temmuz[0]?.miktar;
  const Agustos = Scope1Agustos[0]?.miktar;
  const Eylul = Scope1Eylul[0]?.miktar;
  const Ekim = Scope1Ekim[0]?.miktar;
  const Kasim = Scope1Kasim[0]?.miktar;
  const Aralik = Scope1Aralik[0]?.miktar;

  const Ocak2 = Scope2Ocak[0]?.miktar;
  const Subat2 = Scope2Subat[0]?.miktar;
  const Mart2 = Scope2Mart[0]?.miktar;
  const Nisan2 = Scope2Nisan[0]?.miktar;
  const Mayis2 = Scope2Mayis[0]?.miktar;
  const Haziran2 = Scope2Haziran[0]?.miktar;
  const Temmuz2 = Scope2Temmuz[0]?.miktar;
  const Agustos2 = Scope2Agustos[0]?.miktar;
  const Eylul2 = Scope2Eylul[0]?.miktar;
  const Ekim2 = Scope2Ekim[0]?.miktar;
  const Kasim2 = Scope2Kasim[0]?.miktar;
  const Aralik2 = Scope2Aralik[0]?.miktar;

  const Ocak3 = Scope3Ocak[0]?.miktar;
  const Subat3 = Scope3Subat[0]?.miktar;
  const Mart3 = Scope3Mart[0]?.miktar;
  const Nisan3 = Scope3Nisan[0]?.miktar;
  const Mayis3 = Scope3Mayis[0]?.miktar;
  const Haziran3 = Scope3Haziran[0]?.miktar;
  const Temmuz3 = Scope3Temmuz[0]?.miktar;
  const Agustos3 = Scope3Agustos[0]?.miktar;
  const Eylul3 = Scope3Eylul[0]?.miktar;
  const Ekim3 = Scope3Ekim[0]?.miktar;
  const Kasim3 = Scope3Kasim[0]?.miktar;
  const Aralik3 = Scope3Aralik[0]?.miktar;

  const Scope1GrafikData = [
    Ocak,
    Subat,
    Mart,
    Nisan,
    Mayis,
    Haziran,
    Temmuz,
    Agustos,
    Eylul,
    Ekim,
    Kasim,
    Aralik,
  ];
  const Scope2GrafikData = [
    Ocak2,
    Subat2,
    Mart2,
    Nisan2,
    Mayis2,
    Haziran2,
    Temmuz2,
    Agustos2,
    Eylul2,
    Ekim2,
    Kasim2,
    Aralik2,
  ];
  const Scope3GrafikData = [
    Ocak3,
    Subat3,
    Mart3,
    Nisan3,
    Mayis3,
    Haziran3,
    Temmuz3,
    Agustos3,
    Eylul3,
    Ekim3,
    Kasim3,
    Aralik3,
  ];

  // console.log("Result-------------------",Scope1Ocak[0].miktar)
  // console.log(Scope1GrafikData)

  res.json({
    success: true,
    message: "Successfly dashboard Grafic data",
    data: { Scope1GrafikData, Scope2GrafikData, Scope3GrafikData },
  });
});

const DashboardFacilityGrafic = asyncErrorWrapper(async (req, res, next) => {
  const id = req.user.id;

  const veriall = await FacilityModel.find({ userId: id }).exec();
  const ResultData = [];
  for (let i = 0; i < veriall.length; i++) {
    const element = veriall[i].facilityname;
    // console.log(element)
    var FacilityScope1 = await ScopeModel.aggregate([
      { $match: { tesis: element } },
      { $group: { _id: null, miktar: { $sum: { $toInt: "$miktar" } } } },
    ]);
    // console.log(FacilityScope1[0]?.miktar)
    if (
      FacilityScope1[0]?.miktar === null ||
      FacilityScope1[0]?.miktar === undefined
    ) {
      ResultData.push(Number(0));
    } else {
      ResultData.push(FacilityScope1[0]?.miktar);
    }
  }

  // var FacilityScope1  = await ScopeModel.aggregate([{$match : {tesis: "deneme 666"}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}}}}])

  res.json({
    success: true,
    message: "ok that right facility grafic",
    data: ResultData,
  });
});

const DashboardScopeGrafic = asyncErrorWrapper(async (req, res, next) => {
  app.locals.data = {};

  globalThis.globalVariable;
  // const {id} = req.user.id
  // console.log('id-----------------',req.user.id)
  // console.log("Scope-----------",JSON.stringify(req.app.locals.data.tesisName) )
  const tesisName = req.app.locals.data.tesisName;
  // console.log("userdata",userId)
  // 671f625e6fb5f4cad2600c7c yusuf
  // 672c82e62190de415f3b083c ayse

  // sadece tam sayilari toplama $toInt
  // var CardScope1  = await ScopeModel.aggregate([{$match : {user: new ObjectId(req.user.id),title: "SCOPE-1",tesis:'telefon'}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}} }} ])
  // var CardScope2  = await ScopeModel.aggregate([{$match : {user: new ObjectId(req.user.id),title: "SCOPE-2",tesis:'telefon'}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}} }} ])
  // var CardScope3  = await ScopeModel.aggregate([{$match : {user: new ObjectId(req.user.id),title: "SCOPE-3",tesis:'telefon'}},{$group: {_id : null, miktar: {$sum:{$toInt:"$miktar"}} }} ])

  var CardScope1 = await ScopeModel.aggregate([
    {
      $match: {
        user: new ObjectId(req.user.id),
        title: "SCOPE-1",
        tesis: tesisName,
      },
    },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);
  var CardScope2 = await ScopeModel.aggregate([
    {
      $match: {
        user: new ObjectId(req.user.id),
        title: "SCOPE-2",
        tesis: tesisName,
      },
    },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);
  var CardScope3 = await ScopeModel.aggregate([
    {
      $match: {
        user: new ObjectId(req.user.id),
        title: "SCOPE-3",
        tesis: tesisName,
      },
    },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);

  res.json({
    success: true,
    message: "ok successfuly Card Scope detail",
    data: { CardScope1, CardScope2, CardScope3 },
  });
});

const DashboardWeekGrafic = asyncErrorWrapper(async (req, res, next) => {
  const tesisName = req.app.locals.data.tesisName;

  // function getRelativeDayInWeek(d,dy) {
  //   d = new Date(d);
  //   var day = d?.getDay(),
  //       diff = d?.getDate() - day + (day == 0 ? - 6:dy); // adjust when day is sunday
  //   return new Date(d?.setDate(diff));
  // }

  // var pazartesi = getRelativeDayInWeek(new Date(),1);
  // var sali = getRelativeDayInWeek(new Date(),2);
  // var carsamba = getRelativeDayInWeek(new Date(),3);
  // var persembe = getRelativeDayInWeek(new Date(),4);
  // var cuma = getRelativeDayInWeek(new Date(),5);
  // var cumartesi = getRelativeDayInWeek(new Date(),6);
  // var pazar = getRelativeDayInWeek(new Date(),7);

  // const newPazartesi = pazartesi?.toLocaleDateString().split(".").join("/")
  // const newSali = sali?.toLocaleDateString().split(".").join("/")
  // const newCarsamba = carsamba?.toLocaleDateString().split(".").join("/")
  // const newPersembe = persembe?.toLocaleDateString().split(".").join("/")
  // const newCuma = cuma?.toLocaleDateString().split(".").join("/")
  // const newCumartesi = cumartesi?.toLocaleDateString().split(".").join("/")
  // const newPazar = pazar?.toLocaleDateString().split(".").join("/")

  // console.log("pazartsi--",typeof(newPazartesi))
  // console.log("pazartsi--",JSON.stringify(newPazartesi))

  // const lightFirst = "Ocak - Mart";
  // const lightSecound = "Nisan - Haziran";
  // const lightThird = "Temmuz - Eylül";
  // const lightFour = "Ekim - Aralık";

  // var GrafPazar_Ocak_Mart  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: lightFirst,tarih:'22/12/2024'}},{$group: {_id : null, miktar: {$sum:"$miktar"}}}])
  var GrafPazar_Ocak_Mart = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, situation: "Ocak - Mart" } },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);

  // var GrafPazar_Nisan_Haziran  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: lightSecound,tarih:'22/12/2024'}},{$group: {_id : null, miktar: {$sum:"$miktar"}}}])
  var GrafPazar_Nisan_Haziran = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, situation: "Nisan - Haziran" } },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);

  // var GrafPazar_Temmuz_Eylul  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: lightThird,tarih:'22/12/2024'}},{$group: {_id : null, miktar: {$sum:"$miktar"}}}])
  var GrafPazar_Temmuz_Eylul = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, situation: "Temmuz - Eylül" } },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);

  // var GrafPazar_Ekim_Aralik  = await ScopeModel.aggregate([{$match : {tesis: tesisName, situation: lightFour,tarih:'22/12/2024'}},{$group: {_id : null, miktar: {$sum:"$miktar"}}}])
  var GrafPazar_Ekim_Aralik = await ScopeModel.aggregate([
    { $match: { tesis: tesisName, situation: "Ekim - Aralık" } },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);

  // console.log("sonuc------------",GrafPazartesi_Ekim_Aralik)
  // console.log("sonuc sali-------",GrafSali_Ekim_Aralik)
  // console.log("sonuc carsamba---",GrafCarsamba_Ekim_Aralik)

  // const arrayPazartesiFirst = GrafPazartesi_Ocak_Mart[0]?.miktar;
  // const arraySaliFirst      = GrafSali_Ocak_Mart[0]?.miktar;
  // const arrayCarsambaFirst  = GrafCarsamba_Ocak_Mart[0]?.miktar;
  // const arrayPersembeFirst  = GrafPersembe_Ocak_Mart[0]?.miktar;
  // const arrayCumaFirst      = GrafCuma_Ocak_Mart[0]?.miktar;
  // const arrayCumartesiFirst = GrafCumartesi_Ocak_Mart[0]?.miktar;
  const arrayPazarFirst = GrafPazar_Ocak_Mart[0]?.miktar;

  // const arrayPazartesiSecound = GrafPazartesi_Nisan_Haziran[0]?.miktar;
  // const arraySaliSecound      = GrafSali_Nisan_Haziran[0]?.miktar;
  // const arrayCarsambaSecound  = GrafCarsamba_Nisan_Haziran[0]?.miktar;
  // const arrayPersembeSecound  = GrafPersembe_Nisan_Haziran[0]?.miktar;
  // const arrayCumaSecound      = GrafCuma_Nisan_Haziran[0]?.miktar;
  // const arrayCumartesiSecound = GrafCumartesi_Nisan_Haziran[0]?.miktar;
  const arrayPazarSecound = GrafPazar_Nisan_Haziran[0]?.miktar;

  // const arrayPazartesiThird = GrafPazartesi_Temmuz_Eylul[0]?.miktar;
  // const arraySaliThird      = GrafSali_Temmuz_Eylul[0]?.miktar;
  // const arrayCarsambaThird  = GrafCarsamba_Temmuz_Eylul[0]?.miktar;
  // const arrayPersembeThird  = GrafPersembe_Temmuz_Eylul[0]?.miktar;
  // const arrayCumaThird      = GrafCuma_Temmuz_Eylul[0]?.miktar;
  // const arrayCumartesiThird = GrafCumartesi_Temmuz_Eylul[0]?.miktar;
  const arrayPazarThird = GrafPazar_Temmuz_Eylul[0]?.miktar;

  // const arrayPazartesiFour = GrafPazartesi_Ekim_Aralik[0]?.miktar;
  // const arraySaliFour      = GrafSali_Ekim_Aralik[0]?.miktar;
  // const arrayCarsambaFour  = GrafCarsamba_Ekim_Aralik[0]?.miktar;
  // const arrayPersembeFour  = GrafPersembe_Ekim_Aralik[0]?.miktar;
  // const arrayCumaFour      = GrafCuma_Ekim_Aralik[0]?.miktar;
  // const arrayCumartesiFour = GrafCumartesi_Ekim_Aralik[0]?.miktar;
  const arrayPazarFour = GrafPazar_Ekim_Aralik[0]?.miktar;

  // const Ocak_Mart     = [arrayPazartesiFirst,arraySaliFirst,arrayCarsambaFirst,arrayPersembeFirst,arrayCumaFirst,arrayCumartesiFirst,arrayPazarFirst];
  // const Nisan_Haziran = [arrayPazartesiSecound,arraySaliSecound,arrayCarsambaSecound,arrayPersembeSecound,arrayCumaSecound,arrayCumartesiSecound,arrayPazarSecound];
  // const Temmuz_Eylul = [arrayPazartesiThird,arraySaliThird,arrayCarsambaThird,arrayPersembeThird,arrayCumaThird,arrayCumartesiThird,arrayPazarThird];
  // const Ekim_Aralik = [arrayPazartesiFour,arraySaliFour,arrayCarsambaFour,arrayPersembeFour,arrayCumaFour,arrayCumartesiFour,arrayPazarFour];

  const Ocak_Mart = [arrayPazarFirst, null, null, null, null, null, null];
  const Nisan_Haziran = [null, arrayPazarSecound, null, null, null, null, null];
  const Temmuz_Eylul = [null, null, arrayPazarThird, null, null, null, null];
  const Ekim_Aralik = [null, null, null, arrayPazarFour, null, null, null];

  // const Ocak_Mart = [arrayPazarFirst];
  // const Nisan_Haziran = [arrayPazarSecound];
  // const Temmuz_Eylul = [arrayPazarThird];
  // const Ekim_Aralik = [arrayPazarFour];

  res.json({
    success: true,
    message: "Successfly dashboard Grafic data",
    data: { Ocak_Mart, Nisan_Haziran, Temmuz_Eylul, Ekim_Aralik },
  });
});

const ReportPeriodData = asyncErrorWrapper(async (req, res, next) => {
  const tesisName = req.app.locals.data.tesisName;

  var ReportPeriod_Ocak_Mart1 = await ScopeModel.aggregate([
    {
      $match: { title: "SCOPE-1", tesis: tesisName, situation: "Ocak - Mart" },
    },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);
  var ReportPeriod_Nisan_Haziran1 = await ScopeModel.aggregate([
    {
      $match: {
        title: "SCOPE-1",
        tesis: tesisName,
        situation: "Nisan - Haziran",
      },
    },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);
  var ReportPeriod_Temmuz_Eylul1 = await ScopeModel.aggregate([
    {
      $match: {
        title: "SCOPE-1",
        tesis: tesisName,
        situation: "Temmuz - Eylül",
      },
    },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);
  var ReportPeriod_Ekim_Aralik1 = await ScopeModel.aggregate([
    {
      $match: {
        title: "SCOPE-1",
        tesis: tesisName,
        situation: "Ekim - Aralık",
      },
    },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);

  var ReportPeriod_Ocak_Mart2 = await ScopeModel.aggregate([
    {
      $match: { title: "SCOPE-2", tesis: tesisName, situation: "Ocak - Mart" },
    },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);
  var ReportPeriod_Nisan_Haziran2 = await ScopeModel.aggregate([
    {
      $match: {
        title: "SCOPE-2",
        tesis: tesisName,
        situation: "Nisan - Haziran",
      },
    },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);
  var ReportPeriod_Temmuz_Eylul2 = await ScopeModel.aggregate([
    {
      $match: {
        title: "SCOPE-2",
        tesis: tesisName,
        situation: "Temmuz - Eylül",
      },
    },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);
  var ReportPeriod_Ekim_Aralik2 = await ScopeModel.aggregate([
    {
      $match: {
        title: "SCOPE-2",
        tesis: tesisName,
        situation: "Ekim - Aralık",
      },
    },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);

  var ReportPeriod_Ocak_Mart3 = await ScopeModel.aggregate([
    {
      $match: { title: "SCOPE-3", tesis: tesisName, situation: "Ocak - Mart" },
    },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);
  var ReportPeriod_Nisan_Haziran3 = await ScopeModel.aggregate([
    {
      $match: {
        title: "SCOPE-3",
        tesis: tesisName,
        situation: "Nisan - Haziran",
      },
    },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);
  var ReportPeriod_Temmuz_Eylul3 = await ScopeModel.aggregate([
    {
      $match: {
        title: "SCOPE-3",
        tesis: tesisName,
        situation: "Temmuz - Eylül",
      },
    },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);
  var ReportPeriod_Ekim_Aralik3 = await ScopeModel.aggregate([
    {
      $match: {
        title: "SCOPE-3",
        tesis: tesisName,
        situation: "Ekim - Aralık",
      },
    },
    { $group: { _id: null, miktar: { $sum: "$miktar" } } },
  ]);

  res.json({
    success: true,
    data: {
      KAPSAM1: [
        ReportPeriod_Ocak_Mart1,
        ReportPeriod_Nisan_Haziran1,
        ReportPeriod_Temmuz_Eylul1,
        ReportPeriod_Ekim_Aralik1,
      ],
      KAPSAM2: [
        ReportPeriod_Ocak_Mart2,
        ReportPeriod_Nisan_Haziran2,
        ReportPeriod_Temmuz_Eylul2,
        ReportPeriod_Ekim_Aralik2,
      ],
      KAPSAM3: [
        ReportPeriod_Ocak_Mart3,
        ReportPeriod_Nisan_Haziran3,
        ReportPeriod_Temmuz_Eylul3,
        ReportPeriod_Ekim_Aralik3,
      ],
    },
  });
});

const DeletedFacility = asyncErrorWrapper(async (req, res, next) => {
  const { idDeletedFacility } = req.body;

  // console.log("data----------",idDeletedFacility)
  const deletedData = await FacilityModel.findByIdAndDelete({
    _id: new ObjectId(idDeletedFacility),
  });

  res.json({
    success: true,
    data: deletedData,
  });
});

const GetAllScopeByDateOfDaily = asyncErrorWrapper(async (req, res, next) => {
  const tesisName = req.app.locals.data.tesisName;

  var currentdate = new Date();
var datetime =
  ("0" + currentdate.getDate()).slice(-2) + "." + 
  ("0" + (currentdate.getMonth() + 1)).slice(-2) + "." + 
  currentdate.getFullYear();

console.log(datetime); // Örnek Çıktı: 20.02.2025
  var DailyScope = await ScopeModel.find({
    tesis: tesisName,
    tarih: datetime,
  }).exec();

  res.json({
    success: true,
    data: DailyScope,
  });
});

const DeletedScope = asyncErrorWrapper(async (req, res, next) => {
  const { deleteScopeId } = req.body;
  // console.log("deleed-id------",deleteScopeId)

  const deletedData = await ScopeModel.findByIdAndDelete({
    _id: new ObjectId(deleteScopeId),
  });

  res.json({
    success: true,
    data: deletedData,
  });
});

const FacilitySaveInfo = asyncErrorWrapper(async (req, res, next) => {
  const {
    companyName,
    cknNumber,
    companyNumber,
    companyMail,
    companyWebsite,
    fieldActivity,
    closeArea,
    openArea,
    workerCount,
    totalArea,
    address,
    facilityId,
  } = req.body;

  const savedData = await FacilityInfoModel.create({
    companyName,
    cknNumber,
    companyNumber,
    companyMail,
    companyWebsite,
    fieldActivity,
    closeArea,
    openArea,
    workerCount,
    totalArea,
    address,
    facilityId,
  });
  // console.log("facility info--",resultId)

  res.json({
    success: true,
    message: "facility info post operation successfuly",
    data: savedData,
  });
});

const GetFacilityInfo = asyncErrorWrapper(async (req, res, next) => {
  try {
    const tesisNo = req.app.locals.data.tesisNo;
    console.log("sonc-----------",tesisNo)
    // TesisNo'ya göre tek bir veri çekmek için findOne kullanıyoruz
    const FacilityIdResult = await FacilityInfoModel.findOne({
      facilityId: tesisNo,
    });

    // FacilityIdResult boşsa veya veri bulunamazsa hata dönüyoruz
    if (!FacilityIdResult) {
      return res.status(404).json({
        success: false,
        message: "Tesis bilgisi bulunamadı.",
      });
    }

    // Gelen verileri değişkenlere atıyoruz
    const {
      companyName,
      cknNumber,
      companyNumber,
      companyMail,
      companyWebsite,
      fieldActivity,
      closeArea,
      openArea,
      workerCount,
      totalArea,
      address,
    } = FacilityIdResult;

    // Veriyi başarılı bir şekilde döndürüyoruz
    res.json({
      success: true,
      message: "Tesis bilgisi başarıyla alındı.",
      data: {
        companyName,
        cknNumber,
        companyNumber,
        companyMail,
        companyWebsite,
        fieldActivity,
        closeArea,
        openArea,
        workerCount,
        totalArea,
        address,
      },
    });
  } catch (error) {
    // Herhangi bir hata olursa, hata mesajını döndürüyoruz
    console.error("Tesis bilgisi alma hatası: ", error);
    next(error); // Global error handler'a yönlendirebiliriz
  }
});


const FacilityUpdateInfo = asyncErrorWrapper(async (req, res, next) => {
  const {
    companyName,
    cknNumber,
    companyNumber,
    companyMail,
    companyWebsite,
    fieldActivity,
    closeArea,
    openArea,
    workerCount,
    totalArea,
    address,
    id,
  } = req.body;
  const tesisNo = req.app.locals.data;

  console.log("id---", id);
  console.log("tesisNo-update--", tesisNo);

  let facility = await FacilityInfoModel.updateMany(
    { facilityId: id },
    {
      $set: {
        companyName: companyName,
        cknNumber: cknNumber,
        companyNumber: companyNumber,
        companyMail: companyMail,
        companyWebsite: companyWebsite,
        fieldActivity: fieldActivity,
        closeArea: closeArea,
        openArea: openArea,
        workerCount: workerCount,
        totalArea: totalArea,
        address: address,
      },
    }
  );

  res.status(200).json({
    success: true,
    message: "facility upload successfull",
    // data: facility,
  });
});
const GetExcelData = asyncErrorWrapper(async (req, res, next) => {
  // 📌 Excel Dosyasının Plesk'teki Konumu
  const EXCEL_FILE_PATH = "/var/www/vhosts/app.carbonistan.com/httpdocs/server/uploads/CBAM_Raporu.xlsx";
  console.log("selam---------------------",EXCEL_FILE_PATH)
  try {
    // 📌 Excel dosyasını oku
    const workbook = xlsx.readFile(EXCEL_FILE_PATH, {
      cellStyles: true,
      cellFormula: true,
    });

    const sheetName = "Veri_Girisi"; // Otomatik olarak bu sayfa seçilecek
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
      return res
        .status(404)
        .json({ error: `"${sheetName}" sayfası bulunamadı!` });
    }

    // 📌 Tüm formatları ve stilleri koruyarak JSON'a çevir
    const jsonData = xlsx.utils.sheet_to_json(sheet, {
      raw: false,
      defval: "",
    });

    // 📌 Hücreleri formülleriyle birlikte oku
    const cellData = {};
    Object.keys(sheet).forEach((cell) => {
      if (!cell.startsWith("!")) {
        cellData[cell] = {
          v: sheet[cell].v, // Hücre değeri
          f: sheet[cell].f || null, // Formül varsa ekle
          s: sheet[cell].s || {}, // Stil bilgisi
        };
      }
    });

    res.json({ sheetName, data: jsonData, rawData: cellData });
  } catch (error) {
    console.error("Excel okunurken hata oluştu:", error);
    res.status(500).json({ error: "Excel okunurken hata oluştu!" });
  }
});



const EditData = asyncErrorWrapper(async (req, res, next) => {
    const { id, miktar } = req.body; // Frontend’den gelen veriyi al
    // Eğer gerekli alanlar eksikse hata döndür
    if (!id || miktar === undefined) {
        return res.status(400).json({ success: false, message: "Eksik veri gönderildi." });
    }

    // Güncellenecek veriyi MongoDB'de ara
    const existingData = await ScopeModel.findById(id);
    if (!existingData) {
        return res.status(404).json({ success: false, message: "Veri bulunamadı." });
    }

    // Miktarı güncelle
    existingData.miktar = miktar;
    await existingData.save();

    return res.status(200).json({ success: true, message: "Veri başarıyla güncellendi.", data: existingData });
});




module.exports = {
  GetFacilityInfo,
  updatedFacility,
  addedFacility,
  checkFacilityLimit,
  // deleteFacility,
  EditData,
  GetExcelData,
  FacilityUpdateInfo,
  getLogo,
  imageUpload,
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
  getOneFacility,
  FacilitySaveInfo,
  checkReportLimit,
  checkBalanceReport,
  getReportLimit
};
