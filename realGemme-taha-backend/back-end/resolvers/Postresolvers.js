
const Post = require("../models/Post");
const User = require("../models/User");
const {ObjectId} = require('mongodb');


const resolvers = {
  Query: {
    post: async (parent, { id }) => {
      return await Post.findById(id);
    },
    posts: async (parent, { limit = 5, offset = 0 }) => {
      const query = {};
      const [results, totalCount] = await Promise.all([
        Post.find(query)
          .skip(offset)
          .limit(limit)
          .lean(),
        Post.countDocuments(query)
      ]);
      const hasNextPage = offset + limit < totalCount;
      const hasPreviousPage = offset > 0;
      const startCursor = results[0]._id;
      const endCursor = results[results.length - 1]._id;
      const pageInfo = { hasNextPage, hasPreviousPage, startCursor, endCursor };
      const edges = results.map((doc) => ({ cursor: doc._id, node: doc }));
      const totalPages = Math.ceil(totalCount / limit);
      return { edges, pageInfo, totalCount, totalPages };
    },  
  },
    Mutation: {
      createPost: async  (parent, args , context) => { 
        const {title,content}= args;
      if (context.req.authenticated){  
        const post = new Post({ 
            title, 
            content ,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            author : context.req.authuser,
            image :String 
        });
            await post.save();
            author = await User.findById(context.req.authuser)
            author.posts.push(post.id);
            author.save()
            return post;
      } else return 'you are not logged in'
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
        return "post deleted";
      },


    },
  };

  module.exports= resolvers;