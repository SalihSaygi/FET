"use strict";

var express = require('express');

var dataRouter = express.Router();

var userAdminRouter = require('./userAdmin.route');

var reportRouter = require('./report.route');

var _require = require('../../config/auth'),
    ensureAdmin = _require.ensureAdmin;

dataRouter.use('/', ensureAdmin, function (req, res) {
  res.redirect('/users');
});
dataRouter.use('/users', ensureAdmin, userAdminRouter);
dataRouter.use('/reports', ensureAdmin, reportRouter);
module.exports = dataRouter;