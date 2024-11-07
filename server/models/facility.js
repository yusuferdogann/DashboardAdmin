const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FacilitySchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  employeecount: {
    type: String,
    trim: true,
  },
    facilityname: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    trim: true,
  },
  totalarea: {
    type: String,
    required: true,
  },
  userId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:"users"
  }
});

const FacilityModel = mongoose.model("facility", FacilitySchema);
module.exports = FacilityModel;
