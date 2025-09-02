const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
name : {type : String, required : true},
organization : {type : String, required : true},
email : {type : String, required : true},
 password : {type : String, required : true},
   // 👇 Forgot password fields
  resetToken: {
    type: String,
    default: null,   // null when not requested
  },
  resetTokenExpiry: {
    type: Date,
    default: null,   // null when not requested
  }

})

const User = mongoose.model("User", userSchema)

module.exports = User;