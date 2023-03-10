const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    authorId: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
#   likes: [User!]!
  }
  scalar DateTime
  type Query {
    posts: [Post!]
    post(id: ID!): Post
  }
  input PostInput{
    title:String!
    content:String!
    authorId:ID!
    # author:String!

}

  type Mutation {
    createPost(id: ID, title: String!, content: String!): Post!
    updatePost(id: ID!, title: String, content: String): Post!
    deletePost(id: ID!): ID!
  }
`;
module.exports= typeDefs;