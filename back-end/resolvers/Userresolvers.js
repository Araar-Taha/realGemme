const user = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//we will use this just for trying
const sendmail = require("../helpers/email-send")

const resolvers = {
    
    Query : {
        usercall : () => "Hey user",
        phonenumber : () => Math.round(Math.random() * 10),
        allusers : async () => await user.find(),
    },
    Mutation : {


        adduser : async (parent,args) => {
            const {username,email,password}=args;
            console.log("the user you want to add is : "+args);
            const userexists = await user.findOne({$or : [{username},{email}]});
            //we check if the user already exists or not
            if (userexists){
                if (userexists.username===username){
                    throw new Error('Username already taken');
                }
            
                //if (userexists.email===email){
                  //  throw new Error('email already taken'); 
                //}
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
            //return userexists
            //still needs to create a tokken
            const token = jwt.sign({ username: userexists.username} , process.env.SECRETKEY , {expiresIn:"1h"})
            return token
        },

        //now in auth using Google,i will put a client side resolver here but I have to move it later
        

    },
}

module.exports = resolvers