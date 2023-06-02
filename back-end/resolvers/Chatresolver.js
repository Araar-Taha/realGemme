const mongoose = require('mongoose');
const user = require('../models/User.js');
const Chatroom = require('../models/chat');
const admin = require("firebase-admin");
const { Message} = require('../models/chat');

//const Message = require('../models/chat');
async function sendFCMMessage(event, payload) {
  const reciever = user.findById(payload.recieverId, { username: 1 });

  if (!reciever) {
    throw new Error('no reciever!');
  }

  const messaging = admin.messaging();
  const message = {
    data: {
      event
    },
    notification: {
      title: 'You have a new message',
      body: `${reciever.username}: ${payload.body}`
    },
    tokens: reciever.fcmTokens
  }

  messaging.sendEachForMulticast(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
}

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
        
        // pubsub.publish(`NEW_MESSAGE`, Mssage);
        sendFCMMessage(`NEW_MESSAGE`, Mssage);
        return Mssage;
      },
    },
    // Subscription: {
    //   newMessage: {
    //     subscribe: withFilter(
    //       (_, { chatroomId }) => {
    //         return pubsub.asyncIterator(`NEW_MESSAGE_${chatroomId}`);
    //       },
    //       (payload, variables) => {
    //         return payload.newMessage.chatroomId === variables.chatroomId;
    //       }
    //     ),
    //   },
    // },
  
  };
  
  module.exports = resolver ;