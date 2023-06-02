const Comment = require("../models/Comment")
const Post = require('../models/Post')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ObjectId } = require("mongodb");


const resolver = {
    Query: {
      commentsByPost: async (_, { postId }) => {
        const comments = await Comment.find({ post: postId }).lean().exec();
        return comments;
    }
    },
    Mutation: {
      createComment: async (_, args ,context) => {
        const {content,postID} = args;  
        if (context.req.authenticated){
          const newcomment = new Comment({post : postID,author : context.req.authuser})
          newcomment.comcontent = content
          newcomment.save()
          const POSTID = new ObjectId(postID)
          const post = await Post.findById(POSTID)
          post.comments.push(newcomment.id)
          post.save()
          return newcomment
        }

        
      },
      
    },
  };

module.exports = resolver;