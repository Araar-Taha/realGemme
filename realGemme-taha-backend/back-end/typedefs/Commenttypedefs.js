const { gql } = require("apollo-server-express");
//const { makeExecutableSchema } = require('graphql-tools');
const mongoose =require("mongoose");

const typeDefs = gql`
  type Query {
    commentsByPost(postId: ID): [Comment]
  }
  
  type Comment {
    id: ID!
    comcontent: String!
    author: ID!
    post : ID!
  }

  input CreateCommentInput {
    content: String!
    postId: ID
  }
  type Mutation {
    createComment(content : String , postID : String): Comment!
  }
`;


//const schema = makeExecutableSchema({ typeDefs });
module.exports = typeDefs;
