const {ApolloServer , gql} = require("apollo-server-express");
const mongo = require("mongodb")
const typeDefs= require("./typedefs/Usertypedef")
const resolvers= require("./resolvers/Userresolvers")
const connectDB= require("./helpers/setDB")
const dotenv = require('dotenv').config();
const userDB=require("./models/User");
const { Schema } = require("mongoose");
const port=process.env.PORT || 8080
const userrouter = require('./routes/email-verification')
const express = require('express')
const authMiddleware = require('./middlewares/authcheck')

//here i will try another aproach
const app = express()

app.use(userrouter)
console.log(typeof authMiddleware);
//app.use(authMiddleware)

//connecting to database
connectDB()

//creating the apollo server
const server = new ApolloServer({typeDefs,resolvers,});

async function startserver(){
    await server.start()
    server.applyMiddleware({ app });
    app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
  );
}
startserver()



//finally firing up the server on the port 8080
//server.listen({port }).then(({ url }) => console.log(`GraphQL server running at ${url}`));


