"use strict";

//Server Config
var express = require('express');

var path = require('path');

var http = require('http');

var cors = require('cors');

var io = require('socket.io')(5000);

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

var mongoose = require('mongoose');

var Redis = requrie('ioredis');

var connectToRedis = require('connect-redis')(session);

var RedisStore = connectToRedis(session);

var connectMongoDB = require('./config/db');

connectMongoDB();

var grid = require('gridfs-stream');

var socketioJwt = require('socketio-jwt');

var app = express();
var server = http.createServer(app); //Server Config

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());
var client = newRedis({
  port: port,
  host: host
});
var sessionStore = new RedisStore({
  client: client
});
app.use(session({
  secret: "nebakiyorsunlan",
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    //lasts 1 day
    maxAge: 24 * 60 * 60 * 1000
  }
}));
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

var _require = require('./config/ensureRoles'),
    ensureUser = _require.ensureUser,
    ensureGuest = _require.ensureGuest,
    ensureAdmin = _require.ensureAdmin;

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
app.post('/login/', ensureGuest, passport.authenticate(['local', 'passport-google-oauth']), function (req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.redirect('/dashboard');
});
app.get('/logout', ensureUser, function (req, res) {
  req.logout();
  res.redirect('/');
});
app.post('/register', ensureGuest, userMethods.createUser); //Location Middleware

var location = require('./chatUtils/location');

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
var upload = multer({
  storage: storage
});
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
app.post('/upload/file', upload.single('file'), function (req, res) {
  res.status(201).send(req.file);
});
app.use(passport.initialize());
app.use(passport.session());
app.listen(port, function () {
  console.log("Server started on ".concat(port));
});