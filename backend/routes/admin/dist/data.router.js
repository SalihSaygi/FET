"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dataRouter = express_1["default"].Router();
var userAdmin_route_1 = require("./userAdmin.route");
var report_route_1 = require("./report.route");
var auth_1 = require("../../config/auth");
dataRouter.use('/', auth_1.ensureAdmin, function (req, res) {
    res.redirect('/users');
});
dataRouter.use('/users', auth_1.ensureAdmin, userAdmin_route_1["default"]);
dataRouter.use('/reports', auth_1.ensureAdmin, report_route_1["default"]);
exports["default"] = dataRouter;
