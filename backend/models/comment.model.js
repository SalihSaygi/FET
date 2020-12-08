const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
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
    replies: [ this ],
}, 
    {
    timestamps: true,
}) 