"use strict";

var Report = require('../models/report.model');

var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

exports.createReport = function (req, res) {
  if (!req.body.rateOfReport || !req.body.location) {
    return res.status(400).json({
      message: "Fill in the required fiels"
    });
  }

  var report = new Report({
    rateOfReport: req.body.rateOfReport,
    location: req.body.location,
    explanation: req.body.explanation,
    imageURL: req.body.imageURL,
    reportedBy: req.body.reportedBy,
    timestaps: req.body.timestaps
  });
  report.save().then(function (data) {
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
  User.findById(req.params.reportId).then(function (report) {
    if (!report) {
      return res.status(404).json({
        message: "Couldn't find the report with id: " + req.params.reportId
      });
    }

    res.status(200).json({
      message: "Here is the report with id: " + req.params.reportId
    }, report);
    console.log(user);
  })["catch"](function (err) {
    return res.status(500).json({
      message: err + "\n| Found it but couldn't retrieve the report with id: " + req.params.reportId + " |"
    });
  });
};

exports.findAllReports = function (req, res) {
  User.find().sort({
    timestaps: -1
  }).then(function (reports) {
    res.status(200).json({
      message: "Here is all reports"
    }, users);
  })["catch"](function (err) {
    res.status(500).json({
      message: err.message || "Couldn't get Reports for some reason ¯\\_(ツ)_/¯"
    });
  });
};

exports.deleteReport = function (req, res) {
  User.findByIdAndRemove(req.params.reportId).then(function (report) {
    if (!report) {
      return res.status(404).json({
        message: "Couldn't find the report with id: " + req.params.reportId
      });
    }

    res.status(200).json({
      message: "Deleted the user with id: " + req.params.id
    });
  })["catch"](function (err) {
    return res.status(500).json({
      message: "Couldn't delete user"
    });
  });
};

exports.updateReport = function (req, res) {
  if (!req.body.rateOfReport || !req.body.location) {
    return res.status(400).json({
      message: "Fill in the required fiels"
    });
  }

  User.findByIdAndUpdate(req.params.reportId, req.body, {
    "new": true
  }).then(function (report) {
    if (!report) {
      return res.status(404).json({
        message: "Couldn't find the user with id: " + req.params.reportId
      });
    }

    res.status(200).json(report);
  })["catch"](function (err) {
    return res.status(200).json({
      message: err + "\n| Found it but couldn't retrieve the user with id: " + req.params.id + " |"
    });
  });
};