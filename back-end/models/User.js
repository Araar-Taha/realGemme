const mongoose = require('mongoose');



const userSchma = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    profile_picture: String,
    posts :[mongoose.Schema.Types.ObjectId],    
    friends : [mongoose.Schema.Types.ObjectId],
    verificationtoken : String,
    verified: Boolean,
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
      }],
    fcmTokens: [String]
})

const user = new mongoose.model("user",userSchma)
module.exports = user