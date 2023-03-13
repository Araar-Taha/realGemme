const Comment = require("../models/Comment")
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const resolver = {
    Query: {
      commentsByPost: (_, { postId }) => Comment.find({ post: postId })
    },
    Mutation: {
      createComment: async (_, args ,context) => {
        const {comment,postID} = args;
        comment.author = await User.findById(context.req.authuser);
        // comment.post = await Post.findById(input.post);
        await comment.save();
        return comment;
        
      },
      
    },
  };

module.exports = resolver;