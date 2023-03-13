const { gql } = require("apollo-server-express");
const { makeExecutableSchema } = require('graphql-tools');
const mongoose =require("mongoose");

const typeDefs = gql`
  type Query {
    commentsByPost(postId: ID): [Comment]
  }
  
  type Comment {
    id: ID
    content: String!
    author: ID
  }

  input CreateCommentInput {
    content: String!
    postId: ID
  }
  type Mutation {
    createComment(input: CreateCommentInput!): Comment!
  }
`;


const schema = makeExecutableSchema({ typeDefs });
module.exports = schema;
