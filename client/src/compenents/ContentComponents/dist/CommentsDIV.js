"use strict";
exports.__esModule = true;
exports.CommentsDIV = void 0;
var react_1 = require("react");
var axios_1 = require("axios");
var api = axios_1["default"].create({
    baseURL: process.env.SERVER_URL
});
exports.CommentsDIV = function (_a) {
    var id = _a.id;
    var privateReportEndpoint = "/pReports/" + id + "/comments";
    var requestEndPoint = "requests";
    var publicReportEndpoint = "pbreports";
    var prReport = api.get(privateReportEndpoint);
    var Request = api.get(requestEndPoint);
    var pbReport = api.get(publicReportEndpoint);
    Promise.all([prReport, Request, pbReport]).then(function (values) {
        console.log(values);
    });
    return (react_1["default"].createElement("div", null));
};
