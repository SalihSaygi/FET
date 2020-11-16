//Server Config
const express = require('express')
const path = require('path')
const http = require('http')
const cors = require('cors')
const io = require('socket.io')(5000)
require('dotenv').config({ path: '../.env' })
const URI = process.env.URI
const passport = require('passport')
const multer = require('multer')
const gridFsStorage = require('multer-gridfs-storage')
const pusher = require('pusher')
const session = require('express-session')
const localPassport = require('./config/passport-local')
const googlePassport = require('./config/passport-google')
const mongoose = require('mongoose')
const Redis = requrie('ioredis')
const connectToRedis = require('connect-redis')(session)
const RedisStore = connectToRedis(session)
const connectMongoDB = require('./config/db')
connectMongoDB()
const grid = require('gridfs-stream')
const socketioJwt = require('socketio-jwt')
const app = express()
const server = http.createServer(app);
//Server Config
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const client = newRedis({
    port,
    host
})

const sessionStore = new RedisStore({ client })

app.use(
    session({
      secret: "nebakiyorsunlan",
      resave: false,
      saveUninitialized: true,
      store: sessionStore,
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

localPassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

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

app.post('/login/', 
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
const location = require('./chatUtils/location')
app.use(location)

//SocketIO
io.sockets
    .on('connection', socketioJwt.authorize ({
        secret: 'your secret or public key',
        timeout: 5000
    }))
    .on('authenticated', (socket) => {
        require('./config/socketio')(socket)
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

const upload = multer({ storage })

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

app.post('/upload/file', upload.single('file'), (req, res) => {
    res.status(201).send(req.file)
})

app.use(passport.initialize())
app.use(passport.session())

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})