import mongoose, { Schema, Document } from 'mongoose'

export interface IPrivateReport extends Document {
    title: string
    animalType: string
    animalRace: string
    location: string
    latitude: number
    longtitude: number
    explanation: string
    imageOrVideo: 
}

let PrivateReport: Schema = new Schema({
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
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},
    {
        timestamps: true,
    })

exports.module = PrivateReport = mongoose.model('PrivateReport', PrivateReportSchema)
