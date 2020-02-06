const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  phone: { type: String, required: true, min: 9, max: 10 },
  password: { type: String, required: true, min: 8, max: 32 },
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  address: { type: String, required: true },
  DOB: { type: Date, required: true, min: 1900 },
  username: { type: String, required: true }
  //confirmed:{type:Boolean,default:false}
});

var BuySchema = new mongoose.Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  buyer_name: { type: String, required: true },
  plate_number: { type: String, required: true, min: 4, max: 8 },
  price: { type: Number, required: true },
  phone: { type: String, required: true },
  Buy_date: { type: Date, default: Date.now }
});

var plate_number = new mongoose.Schema({
  UserId: { type: Number, required: true },
  owner_name: { type: String, required: true },
  address: { type: String, required: true }
});

var tokenSchema = new mongoose.Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  tokenUser: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now }
});

let models = {
  User: mongoose.model("User", UserSchema),
  Buyer: mongoose.model("Buyer", BuySchema),
  plate_number: mongoose.model("plate_number", plate_number),
  Token: mongoose.model("Token", tokenSchema)
};

module.exports = models;
