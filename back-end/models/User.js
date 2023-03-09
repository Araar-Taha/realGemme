const mongoose = require('mongoose');
const { post } = require('../routes/email-verification');


const userSchma = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    profile_picture: String,
    post :{ 
        posts :[mongoose.Schema.Types.ObjectId]
        //ref : post       
    },
    firends : [mongoose.Schema.Types.ObjectId],
    verificationtoken : String,
    verified: Boolean,
})

const user = new mongoose.model("user",userSchma)
module.exports = user