"use strict";

var _process$env = process.env,
    _process$env$NODE_ENV = _process$env.NODE_ENV,
    NODE_ENV = _process$env$NODE_ENV === void 0 ? 'development' : _process$env$NODE_ENV,
    _process$env$APP_PORT = _process$env.APP_PORT,
    APP_PORT = _process$env$APP_PORT === void 0 ? 3050 : _process$env$APP_PORT,
    _process$env$APP_HOST = _process$env.APP_HOSTNAME,
    APP_HOSTNAME = _process$env$APP_HOST === void 0 ? 'localhost' : _process$env$APP_HOST,
    _process$env$APP_PROT = _process$env.APP_PROTOCOL,
    APP_PROTOCOL = _process$env$APP_PROT === void 0 ? 'http' : _process$env$APP_PROT,
    _process$env$APP_SECR = _process$env.APP_SECRET,
    APP_SECRET = _process$env$APP_SECR === void 0 ? '4d2ca599b4189f74a771f44b8a8d06f572208b5649f5ae216f8e94612a267ff0' : _process$env$APP_SECR;
var APP_ORIGIN = "".concat(APP_PROTOCOL, "://").concat(APP_HOSTNAME, ":").concat(APP_PORT);
var IN_PROD = NODE_ENV === 'production';
module.exports = APP_ORIGIN, IN_PROD;