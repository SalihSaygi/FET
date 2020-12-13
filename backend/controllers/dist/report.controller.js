"use strict";
exports.__esModule = true;
exports.createReport = function (req, res) {
    var report = new reportModule({
        title: req.body.title,
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
    });
    report.save()
        .then(function (data) {
        res.status(200).json({
            message: "Save is succesful for the data: " + data
        }, data);
    })["catch"](function (err) {
        res.status(500).json({
            message: err.message || "Couldn't save the Report for some reason  ¯\_(ツ)_/¯"
        });
    });
};
exports.findOneReport = function (req, res) {
    reportModule.findById(req.query.reportId)
        .then(function (report) {
        if (!report) {
            return res.status(404).json({
                message: "Couldn't find the report with id: " + req.query.reportId
            });
        }
        res.status(200).json({
            message: "Here is the report with id: " + req.query.reportId
        }, report);
    })["catch"](function (err) {
        return res.status(500).json({
            message: err + "Found it but couldn't retrieve the report with id: " + req.query.reportId + " |"
        });
    });
};
exports.findAllReports = function (req, res) {
    reportModule.find()
        .sort({ timestaps: -1 })
        .then(function (reports) {
        res.status(200).json(reports);
    })["catch"](function (err) {
        res.status(500).json({
            message: err.message || "Couldn't get Reports for some reason ¯\\_(ツ)_/¯"
        });
    });
};
exports.deleteReport = function (req, res) {
    reportModule.findByIdAndRemove(req.query.reportId)
        .then(function (report) {
        if (!report) {
            return res.status(404).json({
                message: "Couldn't find the report with id: " + req.query.reportId
            });
        }
        res.status(200).json({
            message: "Deleted the report with id: " + req.query.reportId
        });
    })["catch"](function (err) {
        return res.status(500).json({
            message: "Couldn't delete report"
        });
    });
};
exports.updateReport = function (req, res) {
    reportModule.findByIdAndUpdate(req.query.reportId, req.body, { "new": true })
        .then(function (report) {
        if (!report) {
            return res.status(404).json({
                message: "Couldn't find the report with id: " + req.query.reportId
            });
        }
        res.status(200).json(report);
    })["catch"](function (err) {
        return res.status(200).json({ message: err + "\n| Found it but couldn't retrieve the report with id: " + req.query.reportId + " |" });
    });
};
