//Server Config
const express = require('express')
const path = require('path')
const http = require('http')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
require('dotenv').config({ path: '../.env' })
const URI = process.env.URI
const passport = require('passport')
const multer = require('multer')
const gridFsStorage = require('multer-gridfs-storage')
const pusher = require('pusher')
const session = require('express-session')
const googlePassport = require('./config/passport-google')
const mongoose = require('mongoose')
const RedisClient = require('ioredis')
const RedisStore = require('rate-limit-redis')(session)
const {REDIS_OPTIONS, SESSION_OPTIONS} = require('./config/redis')
const grid = require('gridfs-stream')
const socketioJwt = require('socketio-jwt')

const app = express()
const server = http.createServer(app)
const io = require('socket.io').listen(server);
//Server Config
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: process.env.ORIGIN_URL
}))
app.use(helmet())
app.use(morgan('common'))

app.enable('trust proxy', 1)

const RateLimit = require('express-rate-limit')
const SlowDown = require("express-slow-down")
const {RateLimiterMemory, BurstyRateLimiter} = require('rate-limiter-flexible')

const clientLimit = new RedisClient({ REDIS_OPTIONS })
const clientSpeed = new RedisClient({ REDIS_OPTIONS })

const limiter = new RateLimit({
    store: new RedisStore({
      clientLimit
    }),
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 50, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
})
const speedLimiter = new SlowDown({
    store: new RedisStore({
        clientSpeed
    }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 10, // allow 100 requests per 15 minutes, then...
    delayMs: 333, // begin adding 500ms of delay per request above 100:
    maxDelayMs: 5000 // max 5 seconds delay
})
const burstyLimiter = new BurstyRateLimiter(
    new RateLimiterMemory({
      points: 2,
      duration: 1,
    }),
    new RateLimiterMemory({
      keyPrefix: 'burst',
      points: 5,
      duration: 10,
    })
)

app.use(speedLimiter)
app.use(limiter)
app.use(burstyLimiter)

app.use(
    session({
      ...SESSION_OPTIONS,
      secret: "nebakiyorsunlan",
      resave: false,
      saveUninitialized: true,
      store: new RedisStore({ RedisClient }),
      cookie: {
          //lasts 1 day
        maxAge: 24*60*60*1000
    }
    })
)

const port = process.env.PORT || 3000

const newPusher = new pusher({
  appId: "1100018",
  key: "f4284b71efae2bd5907f",
  secret: "1fc28addaeb881ff768a",
  cluster: "us3",
  useTLS: true
});

app.use(newPusher)

//Routes

const { ensureUser, ensureGuest, ensureAdmin } = require('./config/ensureRoles')

const adminDashboardRouter = require('./routes/admin/userAdmin.route')
const googleAuthRouter = require('./routes/general/googleAuth.router')
const userMethods = require('./controllers/user.controller')
const reportRoute = require('./routes/general/report.route')

app.use('/report', ensureUser, reportRoute)

app.use('/', ensureGuest, (req, res) => {
    res.send("IT WORKS");
})
app.use('/admin-dashboard', ensureAdmin, adminDashboardRouter)
app.use('/auth', googleAuthRouter)

app.post('/login', 
    ensureGuest, 
    passport.authenticate(['local', 'passport-google-oauth']),
        function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/dashboard')
})

app.get('/logout', ensureUser, function(req, res){
    req.logout()
    res.redirect('/')
})

app.post('/register', ensureGuest, userMethods.createUser)

//Location Middleware
const location = require('./helpers/location.helper')
app.use(location)

//SocketIO
io.use(wrap(session({ secret: "cats" })));

io.sockets
    .on('connection', socketioJwt.authorize ({
        secret: 'your secret or public key',
        timeout: 5000
    }))
    .on('authenticated', (socket) => {
        require('./config/chat.socket')(socket)
        return io
})

//ImageOrVideoStorage

grid.mongo = mongoose.mongo

const storageCon = mongoose.createConnection(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

storageCon.once('open', () => {
    console.log('Storage Database connection has been established succesfully')

    gfs = grid(storageCon.db, mongoose.mongo)
    gfs.collection('images')
    gfs.collection('videos')
})

const maxSize = 5 * 1000 * 1000;

const storage = new gridFsStorage({
    url: URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {{
            const fileType = file.type
            const filename = `${fileType}-${Data.now()}${path.extname(file.originalName)}`
            
            const fileInfo={
                filename: filename,
                bucketName: 'sources'
            }

            resolve(fileInfo)
        }
    })
    }
})

const upload = multer({ storage })

app.post('/upload/file', upload.single('file'), (req, res) => {
    res.status(201).send(req.file)
})

app.use(passport.initialize())
app.use(passport.session())

const { notFound, errorHandler } = require('./helpers/middlewares.helpers')

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})