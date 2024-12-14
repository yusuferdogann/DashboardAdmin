const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FacilityInfoSchema = new Schema({
    companyName: {
    type: String,
    required: true,
  },
  cknNumber: {
    type: String,
    required: true,
  },
  companyNumber: {
    type: String,
    trim: true,
  },
  companyMail: {
    type: String,
    required: true,
  },
  companyWebsite: {
    type: String,
    trim: true,
  },
  productArea: {
    type: String,
    required: true,
  },
  closeArea: {
    type: String,
    required: true,
  },
  openArea: {
    type: String,
    required: true,
  },
  workerCount: {
    type: String,
    required: true,
  },
  totalArea: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  facilityId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:"facilities"
  }
});

const FacilityInfoModel = mongoose.model("facilityInfo", FacilityInfoSchema);
module.exports = FacilityInfoModel;
