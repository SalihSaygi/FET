"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Server Config
var express_1 = __importStar(require("express"));
var path_1 = require("path");
var http_1 = require("http");
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var dotenv = require('dotenv').config({ path: '../.env' });
var passport_1 = require("passport");
var multer_1 = __importDefault(require("multer"));
var multer_gridfs_storage_1 = __importDefault(require("multer-gridfs-storage"));
var pusher_1 = __importDefault(require("pusher"));
var express_session_1 = __importDefault(require("express-session"));
// import googlePassport from './config/passport-google'
var mongoose_1 = require("mongoose");
var ioredis_1 = __importDefault(require("ioredis"));
var RedisStore = require('connect-redis')(express_session_1.default);
var redis_1 = require("./config/redis");
var gridfs_stream_1 = __importDefault(require("gridfs-stream"));
var app = express_1.default();
var server = http_1.createServer(app);
var io = require('socket.io').listen(server);
//Server Config
app.use(express_1.json());
app.use(express_1.urlencoded({ extended: false }));
app.use(cors_1.default({
    origin: process.env.ORIGIN_URL
}));
app.use(helmet_1.default());
app.use(morgan_1.default('common'));
app.enable('trust proxy');
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var express_slow_down_1 = __importDefault(require("express-slow-down"));
var rate_limiter_flexible_1 = require("rate-limiter-flexible");
var clientLimit, clientSpeed = new ioredis_1.default({ REDIS_OPTIONS: redis_1.REDIS_OPTIONS });
var limiter = new express_rate_limit_1.default({
    store: new RedisStore({
        clientLimit: clientLimit
    }),
    windowMs: 15 * 60 * 1000,
    max: 50,
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});
var speedLimiter = new express_slow_down_1.default({
    store: new RedisStore({
        clientSpeed: clientSpeed
    }),
    windowMs: 15 * 60 * 1000,
    delayAfter: 10,
    delayMs: 333,
    maxDelayMs: 5000 // max 5 seconds delay
});
var burstyLimiter = new rate_limiter_flexible_1.BurstyRateLimiter(new rate_limiter_flexible_1.RateLimiterMemory({
    points: 2,
    duration: 1,
}), new rate_limiter_flexible_1.RateLimiterMemory({
    keyPrefix: 'burst',
    points: 5,
    duration: 10,
}));
app.use(speedLimiter);
app.use(limiter);
app.use(burstyLimiter);
app.use(express_session_1.default(__assign(__assign({}, redis_1.SESSION_OPTIONS), { secret: "nebakiyorsunlan", resave: false, saveUninitialized: true, store: new RedisStore({ RedisClient: ioredis_1.default }), cookie: {
        //lasts 1 day
        maxAge: 24 * 60 * 60 * 1000
    } })));
var port = process.env.PORT;
var newPusher = new pusher_1.default({
    appId: "1100018",
    key: "f4284b71efae2bd5907f",
    secret: "1fc28addaeb881ff768a",
    cluster: "us3",
    useTLS: true
});
app.use(newPusher);
//Routes
var ensureRoles_1 = require("./config/ensureRoles");
var userAdmin_route_1 = __importDefault(require("./routes/admin/userAdmin.route"));
var googleAuth_router_1 = __importDefault(require("./routes/general/googleAuth.router"));
var user_controller_1 = require("./controllers/user.controller");
var report_route_1 = __importDefault(require("./routes/general/report.route"));
app.use('/report', ensureRoles_1.ensureUser, report_route_1.default);
app.use('/', ensureRoles_1.ensureGuest, function (req, res) {
    res.send("IT WORKS");
});
app.use('/admin-dashboard', ensureRoles_1.ensureAdmin, userAdmin_route_1.default);
app.use('/auth', googleAuth_router_1.default);
app.post('/login', ensureRoles_1.ensureGuest, passport_1.authenticate(['local', 'passport-google-oauth']), function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/dashboard');
});
app.get('/logout', ensureRoles_1.ensureUser, function (req, res) {
    req.logout();
    res.redirect('/');
});
app.post('/register', ensureRoles_1.ensureGuest, user_controller_1.createUser);
//Location Middleware
var location_helper_1 = __importDefault(require("./helpers/location.helper"));
app.use(location_helper_1.default);
//SocketIO
io.use(wrap(express_session_1.default({ secret: "cats" })));
io.sockets
    .on('connection', ({}))
    .on('authenticated', function (socket) {
    require('./config/chat.socket')(socket);
    return io;
});
//ImageOrVideoStorage
gridfs_stream_1.default.mongo = mongoose.mongo;
var storageCon = mongoose_1.createConnection(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
storageCon.once('open', function () {
    console.log('Storage Database connection has been established succesfully');
    gfs = gridfs_stream_1.default(storageCon.db, mongoose_1.mongo);
    gfs.collection('images');
    gfs.collection('videos');
});
var maxSize = 5 * 1000 * 1000;
var storage = new multer_gridfs_storage_1.default({
    url: URI,
    file: function (req, file) {
        return new Promise(function (resolve, reject) {
            {
                var fileType = file.type;
                var filename = fileType + "-" + Date.now() + path_1.extname(file.originalName);
                var fileInfo = {
                    filename: filename,
                    bucketName: 'sources'
                };
                resolve(fileInfo);
            }
        });
    }
});
var upload = multer_1.default({ storage: storage });
app.post('/upload/file', upload.single('file'), function (req, res) {
    res.status(201).send(req.file);
});
app.use(passport_1.initialize());
app.use(passport_1.session());
var middlewares_helpers_1 = require("./helpers/middlewares.helpers");
app.use(middlewares_helpers_1.notFound);
app.use(middlewares_helpers_1.errorHandler);
app.listen(port, function () {
    console.log("Server started on " + port);
});