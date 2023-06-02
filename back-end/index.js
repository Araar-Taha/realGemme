const {ApolloServer , gql} = require("apollo-server-express")
const mongo = require("mongodb")
const admin = require("firebase-admin");
const connectDB= require("./helpers/setDB")
const dotenv = require('dotenv').config()
const { Schema, default: mongoose } = require("mongoose")
const port=process.env.PORT || 8000
const userrouter = require('./routes/email-verification')
const express = require('express')
const authMiddleware = require('./middlewares/authcheck')
mongoose.set('strictQuery', false);
const { mergeTypeDefs,mergeResolvers } = require('@graphql-tools/merge')
const cors = require("cors")
const { createserver } = require('http')
const { makeExcutableSchema }= require("@graphql-tools/schema")
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { execute , subscribe } = require('graphql')
const path = require('path')
// imporing resolvers
const userresolvers= require("./resolvers/Userresolvers")
const postresolvers = require("./resolvers/Postresolvers")
const commentresolvers = require("./resolvers/Commentresolver")
const Chatresolver = require('./resolvers/Chatresolver')
const groupresolver = require("./resolvers/groupresolver")
// importing typedefs
const Usertypedef = require("./typedefs/Usertypedef")
const Posttypedef = require("./typedefs/Posttypedefs")
const Commenttypedef = require("./typedefs/Commenttypedefs")
const Chattypedefs = require('./typedefs/Chattypedefs')
const grouptypedefs = require ("./typedefs/grouptypedefs")
//upload
const multer = require('multer');  
const user = require('./models/User.js')
const post = require('./models/Post.js')

//here i will try another aproach
const app = express()
app.use(cors())
app.use(express.static('images'))
// app.use(cors)
app.use(userrouter)
app.use(authMiddleware)

app.use('/Uploads',express.static('Uploads'));

const firebase = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(firebase)
});


//connecting to database
connectDB()

// here i will merge the resolvers and typedefs
const resolvers = mergeResolvers([userresolvers,postresolvers,commentresolvers,Chatresolver,groupresolver])
const typeDefs = mergeTypeDefs([Usertypedef,Posttypedef,Commenttypedef,Chattypedefs,grouptypedefs])


//creating the apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context : ({req,res}) => ({ req}),
  introspection: true  

  });



async function startserver(){
    await server.start()
    server.applyMiddleware({ app });
    app.listen({ port }, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
}

//  storage acess
const storage = multer.diskStorage({
  destination: "Uploads",
  filename:(req,file,cb)=>{
   cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
  }
});
const upload = multer({ 
   storage: storage 
})  

app.post('/upload/post/:id', upload.single('image'), async function (req, res, next) {
  const postId = req.params.id; // Assuming you have user authentication implemented
  const imageUrl = req.protocol + "://" + req.get("host") + "/Uploads/" + req.file.filename;

  // Update the user's profile picture URL in the database
  await post.findByIdAndUpdate(postId, { imageUrl },{new:true})
     res.status(200).json({ message: 'Post image uploaded successfully', user,imageUrl: imageUrl });
    
});
app.post('/upload/profile-picture/:id', upload.single('image'), async function (req, res, next) {
  const userId = req.params.id; // Assuming you have user authentication implemented
  const imageUrl = req.protocol + "://" + req.get("host") + "/Uploads/" + req.file.filename;

  // Update the user's profile picture URL in the database
  await user.findByIdAndUpdate(userId, { profile_picture: imageUrl },{new:true})
     res.status(200).json({ message: 'Profile picture uploaded successfully', user,imageUrl: imageUrl });
    
});
// uploading..
app.use((err,req,res,next)=>{
  res.send({err})
})
// uploading..
startserver()


