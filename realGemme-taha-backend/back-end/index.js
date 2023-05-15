const {ApolloServer , gql} = require("apollo-server-express")
const mongo = require("mongodb")
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
const { createServer } = require('http')
const { makeExecutableSchema }= require("@graphql-tools/schema")
const { SubscriptionServer } = require('subscriptions-transport-ws')
// const { execute , subscribe } = require('graphql')
const path = require('path')
// imporing resolvers
const userresolvers= require("./resolvers/Userresolvers")
const postresolvers = require("./resolvers/Postresolvers")
const commentresolvers = require("./resolvers/Commentresolver")
const Chatresolver = require('./resolvers/Chatresolver')
// importing typedefs
const Usertypedef = require("./typedefs/Usertypedef")
const Posttypedef = require("./typedefs/Posttypedefs")
const Commenttypedef = require("./typedefs/Commenttypedefs")
const Chattypedefs = require('./typedefs/Chattypedefs')
//upload
const multer = require('multer');  
const ImageModel = require('./models/image.model.js');
// imports for the chatroom and subscriptions


const {execute, subscribe} = require("graphql")
//here i will try another aproach
const app = express()
app.use(cors())
app.use(express.static('images'))
// app.use(cors)
app.use(userrouter)
app.use(authMiddleware)
app.use('/PostsImages',express.static('PostsImages'));

// stolen 01
// const bodyParser = require('body-parser')
// app.use(bodyParser.json());
//     app.use((req, res, next) => {
//         console.log(req)
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//         res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//         if (req.method === 'OPTIONS') {
//             return res.sendStatus(200);
//         }
//         next();
//     })


//connecting to database
connectDB()

// here i will merge the resolvers and typedefs
const resolvers = mergeResolvers([userresolvers,postresolvers,commentresolvers,Chatresolver])
const typeDefs = mergeTypeDefs([Usertypedef,Posttypedef,Commenttypedef,Chattypedefs])


// creating the subscription server
const schema = makeExecutableSchema({typeDefs , resolvers})
const httpServer  = createServer(app)
const subscriptionserver = SubscriptionServer.create(
  {schema , execute , subscribe},
  {server : httpServer, path : '/graphql'}
)
// const {subscriptionServer, SUBSCRIPTIONS_ENDPOINT} = require('./subscriptionServer')
// subscriptionServer({ schema })

//creating the apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins : [
    {
      async serverWillStart(){
        return {
          async drainServer(){
            subscriptionserver.close()
          }
        }
      }
    }
  ],
  context : ({req,res}) => ({ req}),
  introspection: true  

  });
// creating http server 



async function startserver(){
    await server.start()
    server.applyMiddleware({ app });
    app.listen({ port }, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
}





//  storage acess
const storage = multer.diskStorage({
  destination: "PostsImages",
  filename:(req,file,cb)=>{
   cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
  }
});
const upload = multer({ 
   storage: storage 
}).single('testImage')

app.post('/upload',(req,res)=>{
   upload(req,res,(err)=>{
       if(err){console.log(err)}
       else{
           const newImage = new ImageModel({
               name:req.body.name,
               image:{
                   data:req.file.filename,
                   contentType:'image/png'
               }
           })
           newImage.save()
           .then((savedImage) => {
            const imageUrl = req.protocol + "://" + req.get("host") + "/PostsImages/" + savedImage.image.data;
            return res.status(200).json({imageUrl: imageUrl});
        })
        .catch((err)=>{
            console.log(err);
            return res.status(400).json({error: "Failed to save image data."});
        });
       }
   })
})
// uploading..
startserver()




//server.listen({port }).then(({ url }) => console.log(`GraphQL server running at ${url}`));
 
// here I will send a client request 
//  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWRhNDI3NDI3ZDIzYmQ4ODljYTZhNCIsImlhdCI6MTY3OTY2NDM0OCwiZXhwIjoxNjc5NjcxNTQ4fQ.PEKrB8AkdDgRv6IMePrTnDPqgQO_SBqM2BP6FpdOWbA"
//  fetch('http://localhost:8000/graphql', {
//   method: 'POST',
//   headers: { 
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   },
//   body: JSON.stringify({
//     query: `
//       query {
//         allusers {
//           id
//           username
//           email
//         }
//       }
//     `
//   })
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));