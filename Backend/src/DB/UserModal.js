  const mongoose = require("mongoose");

  const User = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname : {type :String},
    lastname : { type : String},
    mobile : {type : Number},
    created_at: { type: Date, default: Date.now },
    total_xp : {type : Number , default : 0},
    total_hobbies : {type : Number , default : 0},  
  });

  module.exports = mongoose.model("User", User);
