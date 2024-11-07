const asyncErrorWrapper = require("express-async-handler");
const Usermodels = require("../../models/User");
const ScopeModel = require("../../models/scopes");
const FacilityModel = require("../../models/facility")
const { data } = require("../../controllers/DataController");
const uniqid = require("uniqid");

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

  console.log(followedUsers);

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

module.exports = {
  updateFacility,
  addedFacility,
  deleteFacility,
  findObjectName,
  getAllFacility,
  filterFacilityByUserId,
  filterAmountByUserId
};
