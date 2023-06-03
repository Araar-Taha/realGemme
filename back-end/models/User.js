const mongoose = require('mongoose');
const group = require("./group");


const userSchma = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    profile_picture: String,
    posts :[mongoose.Schema.Types.ObjectId],    
    friends : [mongoose.Schema.Types.ObjectId],
    verificationtoken : String,
    verified: Boolean,
    groups: [group.schema],
    fcmTokens: [String]
})

const user = new mongoose.model("user",userSchma)
module.exports = user