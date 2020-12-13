//Server Config
import express, { json, urlencoded } from 'express'
import { extname } from 'path'
import { createServer } from 'http'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
const dotenv = require('dotenv').config({ path: '../.env' })
import { authenticate, initialize, session as _session } from 'passport'
import multer from 'multer'
import gridFsStorage from 'multer-gridfs-storage'
import pusher from 'pusher'
import session from 'express-session'
// import googlePassport from './config/passport-google'
import { mongo, createConnection } from 'mongoose'
import RedisClient from 'ioredis'
const RedisStore = require('connect-redis')(session)
import { REDIS_OPTIONS, SESSION_OPTIONS } from './config/redis'
import grid from 'gridfs-stream'

const app = express()
const server = createServer(app)
const io = require('socket.io').listen(server);
//Server Config
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cors({
    origin: process.env.ORIGIN_URL
}))
app.use(helmet())
app.use(morgan('common'))

app.enable('trust proxy', 1)

import RateLimit from 'express-rate-limit'
import SlowDown from "express-slow-down"
import { RateLimiterMemory, BurstyRateLimiter } from 'rate-limiter-flexible'

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

import { ensureUser, ensureGuest, ensureAdmin } from './config/ensureRoles'

import adminDashboardRouter from './routes/admin/userAdmin.route'
import googleAuthRouter from './routes/general/googleAuth.router'
import { createUser } from './controllers/user.controller'
import reportRoute from './routes/general/report.route'

app.use('/report', ensureUser, reportRoute)

app.use('/', ensureGuest, (req, res) => {
    res.send("IT WORKS");
})
app.use('/admin-dashboard', ensureAdmin, adminDashboardRouter)
app.use('/auth', googleAuthRouter)

app.post('/login', 
    ensureGuest, 
    authenticate(['local', 'passport-google-oauth']),
        function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/dashboard')
})

app.get('/logout', ensureUser, function(req, res){
    req.logout()
    res.redirect('/')
})

app.post('/register', ensureGuest, createUser)

//Location Middleware
import location from './helpers/location.helper'
app.use(location)

//SocketIO
io.use(wrap(session({ secret: "cats" })));

io.sockets
    .on('connection', ({

    }))
    .on('authenticated', (socket) => {
        require('./config/chat.socket')(socket)
        return io
})

//ImageOrVideoStorage

grid.mongo = mongoose.mongo

const storageCon = createConnection(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

storageCon.once('open', () => {
    console.log('Storage Database connection has been established succesfully')

    gfs = grid(storageCon.db, mongo)
    gfs.collection('images')
    gfs.collection('videos')
})

const maxSize = 5 * 1000 * 1000;

const storage = new gridFsStorage({
    url: URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {{
            const fileType = file.type
            const filename = `${fileType}-${Data.now()}${extname(file.originalName)}`
            
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

app.use(initialize())
app.use(_session())

import { notFound, errorHandler } from './helpers/middlewares.helpers'

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})