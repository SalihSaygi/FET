"use strict";
exports.__esModule = true;
exports.Comment = void 0;
var mongoose_1 = require("mongoose");
var CommentSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    likes: {
        type: Number
    },
    replies: [this]
}, {
    timestamps: true
});
exports.Comment = mongoose_1.model('Comment', CommentSchema);
