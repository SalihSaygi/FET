"use strict";
exports.__esModule = true;
exports.Request = void 0;
var mongoose_1 = require("mongoose");
var RequestSchema = new mongoose_1["default"].Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    animalType: {
        type: Number,
        required: true,
        trim: true,
        select: false
    },
    bounty: {
        type: Number,
        required: true,
        trim: true,
        select: false,
        min: 5,
        max: 100
    },
    location: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    extraInfo: {
        type: String,
        required: false,
        trim: true,
        select: false
    },
    imageOrVideo: {
        data: Buffer,
        contentType: String
    },
    updatedAt: {
        type: Date, "default": Date.now
    },
    comments: [{
            type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'Comment'
        }],
    reports: [{
            type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'Report'
        }],
    requestedBy: {
        type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'User'
    },
    likes: {
        type: Number
    }
}, {
    timestamps: true
});
exports.Request = mongoose_1["default"].model('Request', RequestSchema);
