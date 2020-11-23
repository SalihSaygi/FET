"use strict";

var notFound = function notFound(req, res, next) {
  var error = new Error("Not Found - ".concat(req.originalUrl));
  res.status(404);
  next(error);
}; // eslint-disable-next-line no-unused-vars


var errorHandler = function errorHandler(error, req, res, next) {
  var statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
  });
};

module.exports = {
  notFound: notFound,
  errorHandler: errorHandler
};