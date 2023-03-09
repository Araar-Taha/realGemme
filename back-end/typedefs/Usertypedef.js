const {ApolloServer , gql} = require("apollo-server");

const typeDefs = gql`
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
type loginout{
    token : String
    User : ID
}

type Query {
    usercall : String!
    
    getUserByID (id:ID!) : User

    getUserByName (username:String) : User

    allusers : User
}
type Mutation{
    adduser(username:String!, email:String! , password:String!): User!
    
    login (username:String , email:String , password:String!): loginout

    deleteUser (username:String) : User
    
    
}`;
module.exports = typeDefs