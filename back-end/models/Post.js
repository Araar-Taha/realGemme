const mongoose= require("mongoose");

const User = require("./User")



const postSchema=new mongoose.Schema({
    title :{
         type:String,
         required : true
    } ,
    content : {
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now},
    author :{
        id : mongoose.Schema.Types.ObjectId,
        // ref:'User'
    }
})

const Post = new mongoose.model("Post", postSchema)
module.exports=Post;