"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//Server Config
var express = require('express');

var path = require('path');

var http = require('http');

var cors = require('cors');

var morgan = require('morgan');

var helmet = require('helmet');

require('dotenv').config({
  path: '../.env'
});

var URI = process.env.URI;

var passport = require('passport');

var multer = require('multer');

var gridFsStorage = require('multer-gridfs-storage');

var pusher = require('pusher');

var session = require('express-session');

var localPassport = require('./config/passport-local');

var googlePassport = require('./config/passport-google');

var RateLimit = require('express-rate-limit');

var mongoose = require('mongoose');

var Redis = require('ioredis');

var RedisStore = require('rate-limit-redis')(session);

var _require = require('./config/redis'),
    REDIS_OPTIONS = _require.REDIS_OPTIONS,
    SESSION_OPTIONS = _require.SESSION_OPTIONS;

var grid = require('gridfs-stream');

var socketioJwt = require('socketio-jwt');

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server); //Server Config


app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors({
  origin: process.env.ORIGIN_URL
}));
app.use(helmet());
app.use(morgan('common'));
app.enable('trust proxy', 1);
var client = new Redis({
  REDIS_OPTIONS: REDIS_OPTIONS
});
var limiter = new RateLimit({
  store: new RedisStore({
    client: client
  }),
  windowMs: 15 * 60 * 1000,
  //15 minutes
  max: 100,
  // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached

});
app.use(limiter);
app.use(session(_objectSpread({}, SESSION_OPTIONS, {
  secret: "nebakiyorsunlan",
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({
    client: client
  }),
  cookie: {
    //lasts 1 day
    maxAge: 24 * 60 * 60 * 1000
  }
})));
var port = process.env.PORT || 3000;
var newPusher = new pusher({
  appId: "1100018",
  key: "f4284b71efae2bd5907f",
  secret: "1fc28addaeb881ff768a",
  cluster: "us3",
  useTLS: true
});
localPassport(passport, function (email) {
  return users.find(function (user) {
    return user.email === email;
  });
}, function (id) {
  return users.find(function (user) {
    return user.id === id;
  });
}); //Routes

var _require2 = require('./config/ensureRoles'),
    ensureUser = _require2.ensureUser,
    ensureGuest = _require2.ensureGuest,
    ensureAdmin = _require2.ensureAdmin;

var adminDashboardRouter = require('./routes/admin/userAdmin.route');

var googleAuthRouter = require('./routes/general/googleAuth.router');

var userMethods = require('./controllers/user.controller');

var reportRoute = require('./routes/general/report.route');

app.use('/report', ensureUser, reportRoute);
app.use('/', ensureGuest, function (req, res) {
  res.send("IT WORKS");
});
app.use('/admin-dashboard', ensureAdmin, adminDashboardRouter);
app.use('/auth', googleAuthRouter);
app.post('/login', ensureGuest, passport.authenticate(['local', 'passport-google-oauth']), function (req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.redirect('/dashboard');
});
app.get('/logout', ensureUser, function (req, res) {
  req.logout();
  res.redirect('/');
});
app.post('/register', ensureGuest, userMethods.createUser); //Location Middleware

var location = require('./helpers/location.helper');

app.use(location); //SocketIO

io.sockets.on('connection', socketioJwt.authorize({
  secret: 'your secret or public key',
  timeout: 5000
})).on('authenticated', function (socket) {
  require('./config/socketio')(socket);

  return io;
}); //ImageOrVideoStorage

grid.mongo = mongoose.mongo;
var storageCon = mongoose.createConnection(URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
storageCon.once('open', function () {
  console.log('Storage Database connection has been established succesfully');
  gfs = grid(storageCon.db, mongoose.mongo);
  gfs.collection('images');
  gfs.collection('videos');
});
var maxSize = 5 * 1000 * 1000;
var storage = new gridFsStorage({
  url: URI,
  file: function file(req, _file) {
    return new Promise(function (resolve, reject) {
      {
        var fileType = _file.type;
        var filename = "".concat(fileType, "-").concat(Data.now()).concat(path.extname(_file.originalName));
        var fileInfo = {
          filename: filename,
          bucketName: 'sources'
        };
        resolve(fileInfo);
      }
    });
  }
});
var upload = multer({
  storage: storage
});
app.post('/upload/file', upload.single('file'), function (req, res) {
  res.status(201).send(req.file);
});
app.use(passport.initialize());
app.use(passport.session());

var _require3 = require('./helpers/middlewares.helpers'),
    notFound = _require3.notFound,
    errorHandler = _require3.errorHandler;

app.use(notFound);
app.use(errorHandler);
app.listen(port, function () {
  console.log("Server started on ".concat(port));
});