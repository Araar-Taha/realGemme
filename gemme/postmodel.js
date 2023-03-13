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
    image: {
        type: String,
        required: true,
      },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,}
    // author :{
    //     id : mongoose.Schema.Types.ObjectId,
    //     // ref:'user'
    // }
})

const Post = new mongoose.model("Post", postSchema)
module.exports=Post;