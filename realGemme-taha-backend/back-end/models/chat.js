const mongoose = require('mongoose');
const user = require('./User.js');
// const {Types} =  require('mongoose');



const chatroomSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }]
  });
  
  // Message schema
  const messageSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    chatroom: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    receiverId : {
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
  });


  // Chatroom model
const Chatroom = mongoose.model('Chatroom', chatroomSchema);

// Message model
const Message = mongoose.model('Message', messageSchema);

module.exports={Chatroom,Message}
