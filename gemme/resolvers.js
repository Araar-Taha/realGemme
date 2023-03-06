const typeDefs = require('./typeDefs');
const Post = require('./postmodel');


const resolvers = {
    Query: {
      posts: () => Post.find(),
      post: (_, { id }) => Post.findById(id),
    },
    Mutation: {
      createPost: (parent, args) => {
        const {title,content}= args;
        const post = new Post({ title, content });
        return post.save();
      },
      updatePost: async (_, { id, title, content }) => {
        const post = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
        return post;
      },
      deletePost: async (_, { id }) => {
        await Post.findByIdAndDelete(id);
        return id;
      },
    },
  };

  module.exports= resolvers;