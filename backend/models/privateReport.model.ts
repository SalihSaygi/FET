const mongoose = require('mongoose')

const PrivateReportSchema = mongoose.Schema({
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
        required: true,
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
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    reportedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, 
    {
    timestamps: true,
})

module.exports = Report = mongoose.model('PrivateReport', PrivateReportSchema)
