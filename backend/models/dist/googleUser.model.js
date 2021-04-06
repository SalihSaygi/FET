"use strict";
exports.__esModule = true;
exports.googleUser = void 0;
var mongoose_1 = require("mongoose");
var GoogleUserSchema = new mongoose_1["default"].Schema({
    googleId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        "default": Date.now
    }
});
exports.googleUser = mongoose_1["default"].model('googleUser', GoogleUserSchema);
