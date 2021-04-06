"use strict";
exports.__esModule = true;
var express_1 = require("express");
var userRoute = express_1["default"].Router();
var user_controller_1 = require("../../controllers/user.controller");
var ensureRoles_1 = require("../../config/ensureRoles");
// import {  } from '../../config/validation/sign.validation'
userRoute.get('/:userId', ensureRoles_1.ensureUser, user_controller_1["default"].findOneUser);
userRoute.put('/:userId/edit', ensureRoles_1.ensureUser, user_controller_1["default"].updateUser);
userRoute["delete"]('/:userId', ensureRoles_1.ensureUser, user_controller_1["default"].deleteUser);
exports["default"] = userRoute;
