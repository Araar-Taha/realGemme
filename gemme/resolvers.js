const typeDefs = require('./typeDefs');
const Post = require('./postmodel');
const {ObjectId} = require('mongodb');


const resolvers = {
    Query: {
      posts: async  () => await Post.find(),
      post: async  (_, { id }) => await Post.findById(id),
    },
    Mutation: {
      createPost: async  (parent, args) => { 
        const {title,content}= args;
        const post = new Post({ 
            title, 
            content ,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
            await post.save();
            return post;
      },
      updatePost: async (parent, args) => {
        const {id,title, content }=args;
        const ID = new ObjectId(id);
        const post = await Post.findByIdAndUpdate(ID, { title, content }, { new: true });
        if (!post) {
            throw new Error('Post not found');
          }
        return post;
      },
      deletePost: async (_, { id }) => {
        const ID = new ObjectId(id);
        await Post.findByIdAndDelete(ID);
        if (!post) {
            throw new Error('Post not found');
          }
        return id;
      },
    },
  };

  module.exports= resolvers;