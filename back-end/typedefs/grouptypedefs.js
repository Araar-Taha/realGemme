const { gql } = require("apollo-server-express");
const Post = require ("./Posttypedefs")
const typeDefs = gql`
  type Query {
    groups: [Group!]!        
    group(id: ID!): Group!
  }

  type Group {
    id: ID!
    name: String!
    description: String!   
    members: [User!]!
    posts: [Post!]
    owner: User!
    createdDate: String!
  }

  type User {
    _id : ID!
    username : String!
    email : String!
    password : String
    profile_picture: String
    posts : [ID]
    friends : [ID]
    groups: [Group]
    verificationtoken : String
    verified: Boolean
    fcmTokens: [String]
}
  input CreateGroupInput {  
    name: String!
    description: String!
    
  }

  type Mutation {
    createGroup(input: CreateGroupInput!): Group!
    joinGroup(groupId: ID!): Group!
  }
`;

module.exports = typeDefs;