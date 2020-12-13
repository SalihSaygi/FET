"use strict";
exports.__esModule = true;
exports.sessionizeUser = exports.errorHandler = exports.notFound = void 0;
exports.notFound = function (req, res, next) {
    var error = new Error("Not Found - " + req.originalUrl);
    res.status(404);
    next(error);
};
exports.errorHandler = function (error, req, res, next) {
    var statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    });
};
exports.sessionizeUser = function (user) {
    return {
        userId: user.id,
        username: user.nickname
    };
};
