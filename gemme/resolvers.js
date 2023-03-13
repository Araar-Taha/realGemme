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
        const { createReadStream, filename, mimetype } = await image;
        const stream = createReadStream();
        const path = `C:\Users\lebai\Desktop\pics\${id}-${DSC_0611.JPG}`;
        await stream.pipe(fs.createWriteStream(path));
        const {title,content,image}= args;
        const post = new Post({ 
            title, 
            content ,
            image:`${id}-${DSC_0611.JPG}`,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
            await post.save();
            return post;
      },
      updatePost: async (parent, args) => {
        const {id,title, content,image }=args;
        const ID = new ObjectId(id);
        const post = await Post.findByIdAndUpdate(ID, { title, content,image }, { new: true });
        if (!post) {
            throw new Error('Post not found');
          }
          post.updatedAt = new Date();
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