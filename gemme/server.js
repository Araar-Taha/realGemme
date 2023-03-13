const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const multer = require('multer');   
const ImageModel = require('./image.model');




async function startServer(){
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    app.use(bodyParser.json());
    await apolloServer.start()

    apolloServer.applyMiddleware({ app:app })
    try{
        await mongoose.connect('mongodb+srv://wael:waelwael@cluster0.jhibs3t.mongodb.net/?retryWrites=true&w=majority',{
            useUnifiedTopology: true,
            useNewUrlParser:true,
        });
        console.log('Mongoose connected .....');}
        catch (err){
            console.log("failed to connect: " +err.message)
        }

        // storage

        const storage = multer.diskStorage({
           destination: "PostsImages",
           filename:(req,file,cb)=>{
            cb(null,file.originalname);
           }
        });
        const upload = multer({ 
            storage: storage 
        }).single('testImage')

        app.get("/",(req,res)=>{
            req.setEncoding("upload file");
        });

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
                    .then(()=>res.send("sucessfully uploaded"))
                    .catch((err)=>console.log(err))
                }
            })
        })
// uploading
app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000/graphql`)
)};
startServer();