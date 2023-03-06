const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');

async function startServer(){
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
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

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000/graphql`)
)};
startServer();