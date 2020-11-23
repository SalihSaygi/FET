const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/user.model')
require('dotenv').config({path: '.env'})

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3050/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newGoogleUser = {
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        }

        try {
          let googleUser = await User.findOne({ googleId: profile.id })

          if (googleUser) {
            done(null, googleUser)
          } else {
            googleUser = await User.create(newGoogleUser)
            done(null, googleUser)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((googleUser, done) => {
    done(null, googleUser.id)
  })

  passport.deserializeUser((googleId, done) => {
    User.findById(googleId, (err, googleUser) => done(err, googleUser))
  })}