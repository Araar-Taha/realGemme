
const Post = require("../models/Post");
const {ObjectId} = require('mongodb');


const resolvers = {
    Query: {
      posts: async  () => await Post.find(),
      post: async  (_, { id }) => await Post.findById(id),
    },
    Mutation: {
      createPost: async  (parent, args , context) => { 
        const {title,content}= args;
      if (context.req.authentificated){  
        const post = new Post({ 
            title, 
            content ,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            author : context.req.authuser,
        });
            await post.save();
            return post;
      }
    },


      updatePost: async (parent, args,context) => {
        const {id ,title , content }=args;
        const ID = new ObjectId(id);
        const post = await Post.findById(ID);
        if (!post) {
            throw new Error('Post not found');
          }
        if (context.req.authuser==post.author){
          post.updatedAt=Date.now
          post.title=title
          post.content=content
          return post
        }  
        return "you are not the author"
      },


      deletePost: async (_, { id },context) => {
        const ID = new ObjectId(id);
        const post = await  Post.findById(ID);
        if (!post) {
            throw new Error('Post not found');
          }
        if (context.req.authuser==post.author){
          await post.deleteOne()
        }
        return id;
      },


    },
  };

  module.exports= resolvers;