"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var PrivateReportSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    animalType: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    animalRace: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    latitude: {
        type: Number,
        required: true,
        trim: true
    },
    longtitude: {
        type: Number,
        required: true,
        trim: true
    },
    explanation: {
        type: String,
        required: false,
        trim: true,
        select: false
    },
    imageOrVideo: {
        data: Buffer,
        contentType: String
    },
    forWho: {
        type: mongoose_1["default"].Schema.ObjectId, ref: 'User'
    },
    reportedBy: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});
var PrivateReport = mongoose_1["default"].model('PrivateReport', PrivateReportSchema);
exports["default"] = PrivateReport;
