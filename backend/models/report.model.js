const mongoose = require('mongoose')

const ReportSchema = mongoose.Schema({
    animalType: {
        type: Number,
        required: true,
        trim: true,
        select: false
    },
    bounty: {
        type: Number,
        required: false,
        trim: true,
        select: false
    },
    location: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    explanation: {
        type: String,
        required: false,
        trim: true,
        select: false
    },
    imageOrVideo: {
        data: Buffer,
        contentType: String,
        required: true
    },
    forWho: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    comments: [{
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
    }],
    reportedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, 
    {
    timestamps: true,
})

module.exports = Report = mongoose.model('Report', ReportSchema)
