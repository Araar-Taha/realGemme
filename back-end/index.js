const {ApolloServer , gql} = require("apollo-server-express")
const mongo = require("mongodb")
const connectDB= require("./helpers/setDB")
const dotenv = require('dotenv').config()
const { Schema, default: mongoose } = require("mongoose")
const port=process.env.PORT || 8080
const userrouter = require('./routes/email-verification')
const express = require('express')
const authMiddleware = require('./middlewares/authcheck')
mongoose.set('strictQuery', false);
const { mergeTypeDefs,mergeResolvers } = require('@graphql-tools/merge')
const cors = require("cors")
// imporing resolvers
const userresolvers= require("./resolvers/Userresolvers")
const postresolvers = require("./resolvers/Postresolvers")
// importing typedefs
const Usertypedef = require("./typedefs/Usertypedef")
const Posttypedef = require("./typedefs/Posttypedefs")



//here i will try another aproach
const app = express()


// app.use(cors)
app.use(userrouter)
app.use(authMiddleware)



//connecting to database
connectDB()

// here i will merge the resolvers and typedefs
const resolvers = mergeResolvers([userresolvers,postresolvers])
const typeDefs = mergeTypeDefs([Usertypedef,Posttypedef])


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
startserver()


//server.listen({port }).then(({ url }) => console.log(`GraphQL server running at ${url}`));
 
// here I will send a client request 
 const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDcxMmY0ZmU0ZjNhZDU2ODY4ZDU4YyIsImlhdCI6MTY3ODU0ODcxMSwiZXhwIjoxNjc4NTU1OTExfQ.TESOl75b7F6rokXag_LUByuFi9Bv9Lb-BltazROr-FA"
 fetch('http://localhost:8080/graphql', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    query: `
      query {
        allusers {
          id
          username
          email
        }
      }
    `
  })
})
  .then((res) => res.json())
  .then((data) => console.log(data));