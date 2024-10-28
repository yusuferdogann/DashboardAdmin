const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const UserSchema = new Schema({
  tarih: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
    trim: true,
  },
  subtitle: {
    type: String,
  },
  sehir: {
    type: String,
  },
  ulke: {
    type: String,
  },
  ilce: {
    type: String,
  },
  birim: {
    type: String,
  },
  miktar: {
    type: String,
  },
  kaynak: {
    type: String,
  },
  tesis: {
    type: String,
  },
  user: {
    type:mongoose.Schema.ObjectId,
    required:true,
    ref:'User'
  }
});

const DataModel = mongoose.model("data", UserSchema);
module.exports = DataModel;
