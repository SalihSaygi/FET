const mongoose = require('../config/db')

const GoogleReportSchema = mongoose.Schema({
    rateOfReport: {
        type: Number,
        required: true,
        trim: true,
        minlength: 1,
        minlength: 2,
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
    imageURL: {
        type: String,
        required: false,
    },
    reportedBy:  [{type: mongoose.Schema.Types.ObjectId, ref: 'googleUser'}]
}, {
    timestamps: true,
})

module.exports = googleReport = mongoose.model('googleReport', GoogleReportSchema)
