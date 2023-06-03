const {ApolloServer , gql} = require("apollo-server");

const typeDefs = gql`
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

    addFcmToken(fcmToken : String) : User

    addFriend(friendId : ID!) : User 
    
    
}`;
module.exports = typeDefs