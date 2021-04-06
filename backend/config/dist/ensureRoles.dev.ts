"use strict";

module.exports = {
  ensureUser: function ensureUser(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/');
    }
  },
  ensureGuest: function ensureGuest(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/dashboard');
    }
  },
  ensureAdmin: function ensureAdmin(req, res, next) {
    if (req.body.role == 'admin') {
      return next();
    } else {
      res.redirect('/admin-dashboard');
    }
  }
};