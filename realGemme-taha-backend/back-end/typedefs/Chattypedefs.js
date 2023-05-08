const {ApolloServer, gql } = require("apollo-server-express");
//const { makeExecutableSchema } = require('graphql-tools');
const mongoose =require("mongoose");

const typeDefs = gql `
 type User {
    id : ID!
    username : String!
    email : String!
    password : String
    profile_picture: String
    posts : [ID]
    friends : [ID]
    verificationtoken : String
    verified: Boolean
}
  type Message {
    id: ID!
    chatroom:ID!
    content: String!
    sender: ID!
  }

  type Chatroom {
    id: ID!
    sender: User!
    receiver: User!
    messages: [Message!]!
  }

  type Query {
    hello : String
  }

  type Mutation {
    sendmessage(receiverId: ID!, content: String! ): Message
  }

    type Subscription {
      newMessage(chatroomId: ID!): Message
   }
 `;

module.exports = typeDefs