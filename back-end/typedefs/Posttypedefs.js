const { gql } = require('apollo-server-express');
const Comment = require('./Commenttypedefs');


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

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: ID!
    image: String
    comments : [Comment]
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  
  type PostConnection {
    edges: [PostEdge!]
    pageInfo: PageInfo!
    totalCount: Int!
  }
  
  type PostEdge {
    cursor: String!
    node: Post!
  }
  
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }
  
  type Query {
    post(id: ID!): Post
    posts(limit: Int, offset: Int): PostConnection!
  }
 
  scalar DateTime

  input PostInput {
    title: String!
    content: String!
    authorId: ID!
    image : String
    groupId: ID!
  }

  type Mutation {
    createPost(title: String!, content: String!,image:String, groupId: ID!): Post!
    updatePost(id: ID!, title: String!, content: String!): Post!
    deletePost(id: ID!): ID!
  }
`;

module.exports = typeDefs;