"use strict";

var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

var opts = {
  toJSON: {
    virtuals: true
  }
};
var UserSchema = mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  hash: String,
  salt: String,
  googleId: String,
  email: {
    type: String,
    required: true,
    minlength: 7,
    unique: true
  },
  phoneNumber: {
    type: Number,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 11,
    unique: true
  },
  currentRank: {
    type: String,
    required: true,
    "enum": ['Newbie', 'Animal Lover', 'Finder of the Losts', 'Animal Detective']
  },
  role: {
    type: String,
    "enum": ['user', 'admin', 'developer', 'animalControl', 'dbModerator'],
    required: true
  },
  adress: {
    type: String,
    required: false,
    trim: true,
    minlength: 1,
    maxlength: 2
  },
  numberOfFindings: {
    type: Number,
    required: true
  },
  profilePhoto: {
    data: Buffer,
    contentType: String
  },
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report'
  }],
  age: {
    type: Number,
    trim: true,
    required: false
  },
  pronouns: {
    type: String,
    "enum": ['he/him', 'she/her', 'others'],
    required: false
  },
  nationality: {
    type: String,
    trim: true,
    required: false
  },
  bio: {
    type: String,
    required: false
  }
}, {
  timestamps: true
}, opts);
UserSchema.virtual('fullName').get(function () {
  return "".concat(this.firstName, " ").concat(this.lastName);
}).set(function (v) {
  var firstName = v.substring(0, v.indexOf(' '));
  var lastName = v.substring(v.indexOf(' ') + 1);
  opts.toJSON().fullname;
  JSON.stringify(opts);
  this.set({
    firstName: firstName,
    lastName: lastName
  });
});
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    cb(err, isMatch);
  });
};

var User = mongoose.model('User', UserSchema);