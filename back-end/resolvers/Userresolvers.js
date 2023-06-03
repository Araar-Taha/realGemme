const user = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//we will use this just for trying
const sendmail = require("../helpers/email-send");
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");

const resolvers = {
    
    Query : {
        usercall : (parent, args , context) => context.req.authuser ,
        
        getUserByID : async (parent,args) =>{
            const id = args
            const ID = new ObjectId(id)
            try {
                const User = await user.findById(ID);
                if (!User) {
                  throw new Error('User not found');
                }
                return User;
              } catch (error) {
                console.error(error);
                throw new Error('Error fetching user by id');
              }
        },

        getUserByName : async (parent,args) =>{
            const username = args
            try {
                const User = await user.findOne(username);
                if (!User) {
                  throw new Error('User not found');
                }
                return User;
              } catch (error) {
                console.error(error);
                throw new Error('Error fetching user by id');
              }
        },

            // allusers : async (req,res,context) =>{  
            //     userdata =await user.findById(context.req.authuser)
            //     console.log(userdata);
            //     // userdata.password = undefined;
            //     return userdata
            // }

            allusers: async (parent, args, context, info) => {
                return new Promise((resolve) => {
                  setTimeout(async () => {
                    try {
                      const userdata = await user.findById(context.req.authuser);
                      console.log(userdata);
                      // userdata.password = undefined; // If you want to exclude the password from the response
                      resolve(userdata);
                    } catch (error) {
                      // Handle the error appropriately
                      console.error(error);
                      throw new Error("An error occurred while fetching user data.");
                    }
                  }, 2000); // Delay of 2 seconds (2000 milliseconds)
                });
              },
    },
    Mutation : {

    //--------------creating a user resolver------------------------------------    
        adduser : async (parent,args) => {
            const {username,email,password}=args;
            console.log("the user you want to add is : "+args);
            const userexists = await user.findOne({$or : [{username},{email}]});
            //we check if the user already exists or not
            if (userexists){
                if (userexists.username===username){
                    throw new Error('Username already taken');
                }
                // if (userexists.email===email){
                //     throw new Error('email already taken'); 
                // }
            }
            //if the user does not already exists ,we add 
            const cryptpassword = await bcrypt.hash(password,10);
            const User = new user({username,email,password : cryptpassword, verified : false});
            //here we created verification token
           
            User.verificationtoken = jwt.sign({username,id:User.id} , process.env.SECRETKEY , {expiresIn:"1h"});
            //here we send mail to the user that contains the verification token and when he click on it,the user will be verified
            sendmail(email,User.verificationtoken)
            await User.save();
            return User;
        },

        
    //--------------log in resolver and generating a token----------------------------------------------------
        login : async (parent,args) => {
            const {username,email,password} = args;
            const userexists = await user.findOne({$or : [{username},{email}]});
            if (!userexists){
                throw new Error("no user");
            }
            const correctpassword = await bcrypt.compare(password,userexists.password);
            if (!correctpassword){
                throw new Error("incorrect password try again")
            }
            const token = jwt.sign({ id: userexists.id} , process.env.SECRETKEY , {expiresIn:"1000h"})
            userexists.password = undefined
            console.log(token)
            return {token,User:userexists._id}
        },

        
       //we should add google authnetification
    //-------------delete user resolver----------------------------------------------------
        deleteUser : async (parent,args) =>{
            const username = args
            try{
            const deletedUser = await user.findOneAndDelete(username)
            return deletedUser
            }
            catch(err){
                throw new Error('can not delete yo')
            }
        },

        addFcmToken : async (parent, args , context) => {
            const fcmToken = args.fcmToken;
            if (context.req.authenticated){
                const User =await user.findById(context.req.authuser);
                User.fcmTokens.push(fcmToken);
                await User.save()
                return User;
            }
            else {
                throw new Error("No Auth");
            }
            
        },

        addFriend : async (parent , args , context) => {
            const {friendId} = args;
            if (context.req.authenticated){
                const requestSender = await user.findById(context.req.authuser);
                if (!requestSender){
                    throw new Error("problem with authentification");
                }
                requestSender.friends.push(friendId);
                const requestReceiver =  await user.findById(friendId);
                if (!requestReceiver){
                    throw new Error("can not find user");
                }
                requestReceiver.friends.push(context.req.authuser);
                requestSender.save();
                requestReceiver.save();
                return requestSender 
            }
            else {
                throw new Error("No Auth");
            } 
        }

    },
}

module.exports = resolvers