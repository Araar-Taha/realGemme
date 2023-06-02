const mongoose = require("mongoose");


const groupSchema = new mongoose.Schema ({
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }],
    createdDate: {
      type: Date,
      default: Date.now
    }
  });
  
  const Group = mongoose.model('Group', groupSchema);
  module.exports = Group;