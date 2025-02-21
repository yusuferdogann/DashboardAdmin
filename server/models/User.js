const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const limits = {
  demo: { reportLimit: 1, facilityLimit: 1 },
  beginner: { reportLimit: 4, facilityLimit: 1 },
  standard: { reportLimit: 8, facilityLimit: 3 },
  professional: { reportLimit: 12, facilityLimit: 5 },
}; 

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["demo",'beginner', 'standard', 'professional','admin'],
    required: true,
    default: 'demo', // Varsayılan olarak "demo" olacak
  },
  reportLimit: { type: Number}, // Kullanıcının rapor limiti
  facilityLimit: { type: Number}, // Kullanıcının facility limiti
  company_info: [],
  
  facility: [],

  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 4,
  },
  data: {
    type: Date,
    default: new Date(),
  },
});
/**
 * Yeni bir kullanıcı oluşturulduğunda veya rolü değiştirildiğinde limitleri günceller.
 */
UserSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('role')) {
    // Yeni kullanıcı oluşturuluyorsa veya rol değiştiyse, uygun limitleri ata
    const roleSettings = limits[this.role] || limits['demo'];
    this.reportLimit = roleSettings.reportLimit;
    this.facilityLimit = roleSettings.facilityLimit;
  }
  next();
});
UserSchema.methods.genereteJwtFromUser = function () {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
  const payload = {
    id: this._id,
    username: this.username,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE,
  });

  return token;
};
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
