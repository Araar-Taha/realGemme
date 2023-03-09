const {ApolloServer , gql} = require("apollo-server-express");
const mongo = require("mongodb")
const typeDefs= require("./typedefs/Usertypedef")
const resolvers= require("./resolvers/Userresolvers")
const connectDB= require("./helpers/setDB")
const dotenv = require('dotenv').config();
const userDB=require("./models/User");
const { Schema, default: mongoose } = require("mongoose");
const port=process.env.PORT || 8080
const userrouter = require('./routes/email-verification')
const express = require('express')
const authMiddleware = require('./middlewares/authcheck')
mongoose.set('strictQuery', false);

//here i will try another aproach
const app = express()



app.use(userrouter)
app.use(authMiddleware)



//connecting to database
connectDB()



//creating the apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context : ({_,res}) => ({ locals: res.locals}),
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
//  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDcxMmY0ZmU0ZjNhZDU2ODY4ZDU4YyIsImlhdCI6MTY3ODM3MjAyNSwiZXhwIjoxNjc4Mzc1NjI1fQ.0ifEPchyeDH6nd8MJQHalhNYY89Cm_JctTUWXW9yN0s"
//  fetch('http://localhost:8080/graphql', {
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