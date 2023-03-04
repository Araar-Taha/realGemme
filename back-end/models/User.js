const mongoose = require('mongoose');

const userSchma = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    profile_picture: String,
    verificationtoken : String,
    verified: Boolean,
})

const user = new mongoose.model("user",userSchma)
module.exports = user