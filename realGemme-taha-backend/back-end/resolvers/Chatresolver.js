const mongoose = require('mongoose');
const user = require('../models/User.js');
const { Chatroom, Message} = require('../models/chat');

const { withFilter } = require('graphql-subscriptions');
//const Message = require('../models/chat');


const resolver = {
    Query: {
      //chatroom: (_, { id }) => {chatroom.find((c) => c.id === id)}
    }, 
    Mutation: {
      sendmessage: async (_, { receiverId, content }, { req }) => {
        console.log(content);
        const receiver = await user.findById(receiverId);

        if (!receiver)
          throw new Error('rec not found');

        console.log(Chatroom)

        var chatroom = await Chatroom.findOne({ $or: [ { receiver: receiverId, author: req.authuser}, {receiver:  req.authuser, author: receiverId} ]} );

        if (!chatroom) {
          chatroom = await Chatroom.create({ receiver: receiverId, author: req.authuser });
        }

        console.log(chatroom)

        
        const Mssage = await Message.create({receiverId, content, chatroom: chatroom._id, sender: req.authuser});

        console.log(Mssage)

        chatroom.messages.unshift(Mssage.id);
        await chatroom.save()
        
        pubsub.publish(`NEW_MESSAGE`, Mssage);

        return Mssage;
      },
      // postMessage: (_, { chatroomId, userId, content }) => {
      //   const chatroom = chatroom.find((c) => c.id === chatroomId);
  
      //   if (!chatroom) {
      //     throw new Error("Chatroom not found");
      //   }
  
      //   const user = user.find((u) => u.id === userId);
  
      //   if (!user) {
      //     throw new Error("User not found");
      //   }
  
      //   const message = {
      //     id: uuidv4(),
      //     content,
      //     sender: user,
      //   };
  
      //   chatroom.messages.push(message);
  
  
      //   return message;
      // },
    },
    Subscription: {
      newMessage: {
        subscribe: withFilter(
          () => {
            return pubsub.asyncIterator(`NEW_MESSAGE`);
          },
          () => {
            return payload.chatroomId.equals(variables.chatroomId);
          }
        ),
      },
    },
  
  };
  
  module.exports = resolver ;