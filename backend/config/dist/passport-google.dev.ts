"use strict";

var GoogleStrategy = require('passport-google-oauth20').Strategy;

var mongoose = require('mongoose');

var User = require('../models/user.model');

require('dotenv').config({
  path: '.env'
});

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3050/auth/google/callback'
  }, function _callee(accessToken, refreshToken, profile, done) {
    var newGoogleUser, googleUser;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newGoogleUser = {
              googleId: profile.id,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              image: profile.photos[0].value
            };
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(User.findOne({
              googleId: profile.id
            }));

          case 4:
            googleUser = _context.sent;

            if (!googleUser) {
              _context.next = 9;
              break;
            }

            done(null, googleUser);
            _context.next = 13;
            break;

          case 9:
            _context.next = 11;
            return regeneratorRuntime.awrap(User.create(newGoogleUser));

          case 11:
            googleUser = _context.sent;
            done(null, googleUser);

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 15]]);
  }));
  passport.serializeUser(function (googleUser, done) {
    done(null, googleUser.id);
  });
  passport.deserializeUser(function (googleId, done) {
    User.findById(googleId, function (err, googleUser) {
      return done(err, googleUser);
    });
  });
};