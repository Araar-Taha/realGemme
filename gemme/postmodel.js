const mongoose= require("mongoose");
const { countDocuments } = require("../../../Graphql-projects/models/Post.models");




const postSchema=new mongoose.Schema({
    title :{
         type:String,
         required : true
    } ,
    content : {
        type:String,
    },
    author :{
        id : mongoose.Schema.Types.ObjectId,
        // ref:'user'
    }
})

const Post = new mongoose.model("Post", postSchema)
module.exports=Post;