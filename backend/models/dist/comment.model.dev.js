"use strict";

var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    select: false
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number
  },
  replies: [void 0]
}, {
  timestamps: true
});