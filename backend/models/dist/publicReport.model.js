"use strict";
exports.__esModule = true;
exports.PublicReport = void 0;
var mongoose_1 = require("mongoose");
var PublicReportSchema = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment'
        }],
    likes: {
        type: Number
    }
}, {
    timestamps: true
});
exports.PublicReport = mongoose_1.model('PublicReport', PublicReportSchema);
