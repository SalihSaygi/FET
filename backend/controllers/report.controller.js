const reportModule = require('../models/report.model')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

exports.createReport = (req, res) => {
    if(!req.body.rateOfReport || !req.body.location) {
        return res.status(400).json({
            message: "Fill in the required fiels"
        })
    }
    const report = new reportModule({
        animalType: req.body.animalType,
        bounty: req.body.bounty,
        rateOfReport: req.body.rateOfReport,
        location: req.body.location,
        latitude: req.body.latitude,
        longtitude: req.body.longtitude,
        explanation: req.body.explanation,
        imageOrVideo: req.body.imageOrVideo,
        forWho: req.body.forWho,
        comments: req.body.comments,
        reportedBy: req.body.reportedBy,
        timestaps: req.body.timestaps
    })

    report.save()
    .then((data) => {
        res.status(200).json(
            {
                message: "Save is succesful for the data: " + data 
            }, 
                data
        )
    })
    .catch((err) => {
        res.status(500).json({
            message: err.message || "Couldn't save the Report for some reason  ¯\_(ツ)_/¯"
        })
    })

}

exports.findOneReport = (req, res) => {
    Report.findById(req.query.reportId)
        .then((report) => {
            if(!report) {
                return res.status(404).json({
                    message: "Couldn't find the report with id: " + req.params.reportId,
                })
            }
            res.status(200).json(
                {
                    message: "Here is the report with id: " + req.params.reportId
                },
                    report
            )
            console.log(user)
        })
        .catch((err) => {
            return res.status(500).json({
                message: err + "Found it but couldn't retrieve the report with id: " + req.params.reportId + " |"
            })
        })
}

exports.findAllReports = (req, res) => {
    Report.find()
        .sort({ timestaps: -1 })
        .then((reports) => {
            res.status(200).json(reports)
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Couldn't get Reports for some reason ¯\\_(ツ)_/¯"
            })
        })
}

exports.deleteReport = (req, res) => {
    Report.findByIdAndRemove(req.query.reportId)
        .then((report) => {
            if(!report) {
                return res.status(404).json({
                    message: "Couldn't find the report with id: " + req.query.reportId
                })
            }
            res.status(200).json(
                {
                    message: "Deleted the report with id: " + req.query.reportId
                }
            )
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Couldn't delete report"
            })
        })
}

exports.updateReport = (req, res) => {
    if(!req.body.rateOfReport || !req.body.location) {
        return res.status(400).json({
            message: "Fill in the required fiels"
        })
    }
    Report.findByIdAndUpdate(req.query.reportId, req.body, { new: true})
        .then((report) => {
            if(!report) {
                return res.status(404).json({
                    message: "Couldn't find the report with id: " + req.query.reportId,
                })
            }
            res.status(200).json(report)
        })
        .catch((err) => {
            return res.status(200).json(
                { message: err + "\n| Found it but couldn't retrieve the report with id: " + req.query.reportId + " |" }
            )
        })
}

