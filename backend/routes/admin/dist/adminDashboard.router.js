"use strict";
exports.__esModule = true;
var express_1 = require("express");
var adminDashboardRouter = express_1["default"].Router();
var ensureRoles_1 = require("../../config/ensureRoles");
var data_router_1 = require("./data.router");
adminDashboardRouter.use('/data', ensureRoles_1.ensureAdmin, data_router_1["default"]);
exports["default"] = adminDashboardRouter;
