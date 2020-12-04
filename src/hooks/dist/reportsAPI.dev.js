"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// eslint-disable-next-line import/no-anonymous-default-export
var _default = {
  getReports: function getReports() {
    return fetch('/reports').then(function (res) {
      return res.json();
    });
  },
  getOneReport: function getOneReport(_id) {
    return fetch("/reports?q=".concat(encodeURIComponent(_id)), {
      method: 'GET'
    }.then(function (res) {
      return res.json;
    }));
  },
  deleteReport: function deleteReport(_id) {
    return fetch("/reports?q=".concat(encodeURIComponent(_id)), {
      method: 'DELETE'
    }).then(function (res) {
      return res.json();
    });
  },
  updateReport: function updateReport(report) {
    return fetch("/reports?q=".concat(encodeURIComponent(report._id)), {
      method: "PUT",
      body: JSON.stringify(report),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (res) {
      return res.json();
    });
  },
  createReport: function createReport(report) {
    return fetch("/reports/create", {
      method: 'POST',
      body: JSON.stringify(report),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (res) {
      return res.json();
    });
  }
};
exports["default"] = _default;