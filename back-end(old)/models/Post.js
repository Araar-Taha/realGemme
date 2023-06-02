const mongoose= require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
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
    author : mongoose.Schema.Types.ObjectId,
    comments : [mongoose.Schema.Types.ObjectId],
})
postSchema.plugin(mongoosePaginate);
const Post = new mongoose.model("Post", postSchema)
module.exports=Post;