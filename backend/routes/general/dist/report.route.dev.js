"use strict";

var express = require('express');

var reportRouter = express.Router();

var reportMethods = require('../../controllers/report.controller');

var _require = require('../../config/ensureRoles'),
    ensureUser = _require.ensureUser;

reportRouter.get('/', ensureUser, reportMethods.findAllReports);
reportRouter.post('/create', ensureUser, reportMethods.createReport);
reportRouter.get('/', ensureUser, reportMethods.findOneReport);
reportRouter.put('/:reportId    ', ensureUser, reportMethods.updateReport);
reportRouter["delete"]('/:reportId', ensureUser, reportMethods.deleteReport);
module.exports = reportRouter;