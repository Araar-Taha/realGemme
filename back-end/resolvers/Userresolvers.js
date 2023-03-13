const user = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//we will use this just for trying
const sendmail = require("../helpers/email-send");
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");

const resolvers = {
    
    Query : {
        usercall : () => "Hey user",
        
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

        allusers : async (req,res,context) =>{  
            userdata =await user.findById(context.req.authuser)
            return userdata
        }
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
            //we just need to setup the email verification 
            const cryptpassword = await bcrypt.hash(password,10);
            const User = new user({username,email,password : cryptpassword, verified : false});
            //here we created verification token
            User.verificationtoken = jwt.sign({username} , process.env.SECRETKEY , {expiresIn:"1h"});
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
                throw new Error("incorrect password al7ej")
            }
            
            //still needs to create a tokken
            const token = jwt.sign({ id: userexists.id} , process.env.SECRETKEY , {expiresIn:"2h"})
            userexists.password = undefined
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
        }

    },
}

module.exports = resolvers