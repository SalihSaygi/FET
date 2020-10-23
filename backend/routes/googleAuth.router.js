
const express = require('express')
const passport = require('passport')
const googleRouter = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
googleRouter.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
googleRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard')
  }
)

// @desc    Logout user
// @route   /auth/logout
googleRouter.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = googleRouter