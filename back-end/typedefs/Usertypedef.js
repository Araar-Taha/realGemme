const {ApolloServer , gql} = require("apollo-server");

const typeDefs = gql`
type User {
    username : String!
    email : String!
    password : String
    profile_picture: String
    verificationtoken : String
    verified: Boolean
}

type Query {
    usercall : String!
    phonenumber : Int!
    allusers : [User!]
}
type Mutation{
    adduser(username:String!, email:String! , password:String!): User!
    login (username:String , email:String , password:String!): String
    
}`;
module.exports = typeDefs