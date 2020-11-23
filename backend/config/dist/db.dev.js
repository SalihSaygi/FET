"use strict";

var _process$env = process.env,
    _process$env$MONGO_US = _process$env.MONGO_USERNAME,
    MONGO_USERNAME = _process$env$MONGO_US === void 0 ? 'admin' : _process$env$MONGO_US,
    _process$env$MONGO_PA = _process$env.MONGO_PASSWORD,
    MONGO_PASSWORD = _process$env$MONGO_PA === void 0 ? 'secret' : _process$env$MONGO_PA,
    _process$env$MONGO_HO = _process$env.MONGO_HOST,
    MONGO_HOST = _process$env$MONGO_HO === void 0 ? 'localhost' : _process$env$MONGO_HO,
    _process$env$MONGO_PO = _process$env.MONGO_PORT,
    MONGO_PORT = _process$env$MONGO_PO === void 0 ? 27017 : _process$env$MONGO_PO,
    _process$env$MONGO_DA = _process$env.MONGO_DATABASE,
    MONGO_DATABASE = _process$env$MONGO_DA === void 0 ? 'kaster' : _process$env$MONGO_DA;
var URI = "mongodb://\n    ".concat(MONGO_USERNAME, ":\n    ").concat(encodeURIComponent(MONGO_PASSWORD), "@\n    ").concat(MONGO_HOST, ":\n    ").concat(MONGO_PORT, "/\n    ").concat(MONGO_DATABASE);
var MONGO_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};