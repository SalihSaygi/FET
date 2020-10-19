const mongoose = require('mongoose')

const ReportSchema = mongoose.Scehema({
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
    reportedBy:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true,
})

module.exports = Report = mongoose.model('Report', ReportSchema)
