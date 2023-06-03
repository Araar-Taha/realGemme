const Group = require("../models/group");
const User =require("../models/User")
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const resolvers = {
    Query: {
      groups: async () => {
        return await Group.find();
      },
      group: async (parent, args) => {
        const { id } = args;
        return await Group.findById(id);
      }, 
    },
    Mutation: {
      createGroup: async (parent, args,context) => {
        const { name, description } = args.input;
        const group = await Group.findOne({ name });
        if (group) {
          throw new Error("Group already exists with this name");
        }
        const newGroup = await Group.create({
          name,
          description,
          owner: context.req.authuser,
        });
        newGroup.members.push(context.req.authuser)
        newGroup.save();
        return newGroup;
      },
      joinGroup: async (parent, { groupId }, context) => {
        
        if (!context.req.authenticated) {
          throw new Error('User is not authenticated');
        }
      
        if (!groupId) {
          throw new Error('Invalid groupId');
        }
      
        const group = await Group.findById(groupId);
        if (!group) {
          throw new Error('Group not found');
        }
      
        if (group.members.includes(context.req.authuser)) {
          throw new Error('User is already a member of the group');
        }
      
        group.members.push(context.req.authuser);
        await group.save();
      const author = await User.findById(context.req.authuser);
        if (!author.groups.includes(group)) {
          author.groups.push(group);
          console.log("member added to the group")
          await author.save();
        }
        return group;
      }
      
      
   },
   Group: {
    members: async (group) => {
      const members = await User.find({ _id: { $in: group.members } });
      return members;
    },
  }, 

  };
  
  
  module.exports = resolvers;