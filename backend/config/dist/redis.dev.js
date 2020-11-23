"use strict";

//SET TIMES
var ONE_HOUR = 1000 * 60 * 60;
var HALF_HOUR = ONE_HOUR / 2;
var SIX_HOURS = ONE_HOUR * 6;

var ioredis = require('ioredis'); //RedisStore


var _process$env = process.env,
    _process$env$REDIS_PO = _process$env.REDIS_PORT,
    REDIS_PORT = _process$env$REDIS_PO === void 0 ? 6379 : _process$env$REDIS_PO,
    _process$env$REDIS_HO = _process$env.REDIS_HOST,
    REDIS_HOST = _process$env$REDIS_HO === void 0 ? 'localhost' : _process$env$REDIS_HO,
    _process$env$REDIS_PA = _process$env.REDIS_PASSWORD,
    REDIS_PASSWORD = _process$env$REDIS_PA === void 0 ? 'secretKey1' : _process$env$REDIS_PA;
var REDIS_OPTIONS = {
  port: +REDIS_PORT,
  host: REDIS_HOST,
  password: REDIS_PASSWORD
}; //RedisSession

var session = require('express-session');

var _process$env2 = process.env,
    _process$env2$SESSION = _process$env2.SESSION_SECRET,
    SESSION_SECRET = _process$env2$SESSION === void 0 ? 'reallySecretSessionPass1' : _process$env2$SESSION,
    _process$env2$SESSION2 = _process$env2.SESSION_NAME,
    SESSION_NAME = _process$env2$SESSION2 === void 0 ? 'SID' : _process$env2$SESSION2,
    _process$env2$SESSION3 = _process$env2.SESSION_IDLE_TIMEOUT,
    SESSION_IDLE_TIMEOUT = _process$env2$SESSION3 === void 0 ? HALF_HOUR : _process$env2$SESSION3;
var _process$env$NODE_ENV = process.env.NODE_ENV,
    NODE_ENV = _process$env$NODE_ENV === void 0 ? 'development' : _process$env$NODE_ENV;
var IN_PROD = NODE_ENV === 'production';
var SESSION_OPTIONS = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: IN_PROD,
    sameSite: true
  },
  rolling: true,
  resave: false,
  saveUninitialize: false
};
module.exports = REDIS_OPTIONS, SESSION_OPTIONS;