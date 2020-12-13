import mongoose from 'mongoose'

const RequestSchema = new mongoose.Schema({
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
        type: Date, default: Date.now
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment',
    }],
    reports: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Report',
    }],
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    likes: {
        type: Number
    }
}, 
    {
    timestamps: true,
})

exports.module = Request = mongoose.model('Request', RequestSchema)
