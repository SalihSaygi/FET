const Report = require('../models/report.model')

const bcrypt = require('bcrypt')

exports.createReporter = (req, res) => {
    if(!req.body.rateOfReport || !req.body.location) {
        return res.status(400).send({
            message: "Fill in the required fiels"
        })
    }
    const report = new UserApiKey({
        rateOfReport: req.body.rateOfReport,
        location: req.body.location,
        explanation: req.body.explanation,
        imageURL: req.body.imageURL,
        reportedBy: req.body.reportedBy,
        timestaps: req.body.timestaps
    })
}

report.save()
    .then((data) => {
        res.status(200).send(
            {
                message: "Save is succesful for the data: " + data 
            }, 
                data
        )
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Couldn't save the Report for some reason  ¯\_(ツ)_/¯"
        })
    })

exports.findOneReport = (req, res) => {
    User.findById(req.params.reportId)
        .then((report) => {
            if(!report) {
                return res.status(404).send({
                    message: "Couldn't find the report with id: " + req.params.reportId,
                })
            }
            res.status(200).send(
                {
                    message: "Here is the report with id: " + req.params.reportId
                },
                    report
            )
            console.log(user)
        })
        .catch((err) => {
            return res.status(500).send({
                message: err + "\n| Found it but couldn't retrieve the report with id: " + req.params.reportId + " |"
            })
        })
}

exports.findAllReports = (req, res) => {
    User.find()
        .sort({ timestaps: -1 })
        .then((reports) => {
            res.status(200).send(
                {
                    message: "Here is all reports"
                }, 
                users
                )
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Couldn't get Reports for some reason ¯\\_(ツ)_/¯"
            })
        })
}

exports.deleteReport = (req, res) => {
    User.findByIdAndRemove(req.params.reportId)
        .then((report) => {
            if(!report) {
                return res.status(404).send({
                    message: "Couldn't find the report with id: " + req.params.reportId
                })
            }
            res.status(200).send(
                {
                    message: 
                        "Deleted the user with id: " + req.params.id
                }
            )
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Couldn't delete user"
            })
        })
}

exports.updateReport = (req, res) => {
    if(!req.body.rateOfReport || !req.body.location) {
        return res.status(400).send({
            message: "Fill in the required fiels"
        })
    }
    User.findByIdAndUpdate(req.params.reportId, req.body, { new: true})
        .then((report) => {
            if(!report) {
                return res.status(404).send({
                    message: "Couldn't find the user with id: " + req.params.reportId,
                })
            }
            res.status(200).send(report)
        })
        .catch((err) => {
            return res.status(200).send(
                { message: err + "\n| Found it but couldn't retrieve the user with id: " + req.params.id + " |" }
            )
        })
}

