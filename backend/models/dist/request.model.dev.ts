"use strict";

var mongoose = require('mongoose');

var RequestSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    select: false
  },
  animalType: {
    type: Number,
    required: true,
    trim: true,
    select: false
  },
  bounty: {
    type: Number,
    required: false,
    trim: true,
    select: false
  },
  location: {
    type: String,
    required: true,
    trim: true,
    select: false
  },
  extraInfo: {
    type: String,
    required: false,
    trim: true,
    select: false
  },
  imageOrVideo: {
    data: Buffer,
    contentType: String
  },
  updatedAt: {
    type: Date,
    "default": Date.now
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report'
  }],
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});
module.exports = Report = mongoose.model('Report', ReportSchema);