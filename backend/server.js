//Server Config
const express = require('express')
const path = require('path')
const http = require('http')
const cors = require('cors')
const io = require('socket.io')(5000)
require('dotenv').config({ path: '.env' })
const passport = require('passport')
const session = require('express-session')
const localPassport = require('./config/passport-local')
const googlePassport = require('./config/passport-google')
const mongoose = require('mongoose')
const database = require('./config/db')
const MongoStore = require('connect-mongo')(session)
const { connection } = require('./config/db')
const socketioJwt = require('socketio-jwt')
const app = express()
const server = http.createServer(app);
//Server Config
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' })

app.use(
    session({
      secret: "nebakiyorsunlan",
      resave: false,
      saveUninitialized: true,
      store: sessionStore,
      cookie: {
        maxAge: 24*60*60*1000
    }
    })
)

const port = process.env.PORT || 3000

const Pusher = require("pusher");

const pusher = new Pusher({
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

const { ensureUser, ensureGuest, ensureAdmin } = require('./config/auth')

const router = express.Router()
const adminDashboardRouter = require('./routes/admin/userAdmin.route')
const googleAuthRouter = require('./routes/admin/googleAuth.router')
const userMethods = require('./controllers/user.controller')

app.use('/', ensureGuest, router)
app.use('/admin-dashboard', ensureAdmin, adminDashboardRouter)
app.use('/auth', googleAuthRouter)

app.post('/login', 
    ensureGuest, 
    passport.authenticate(['local', 'passport-google-oauth']),
        function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/dashboard/')
})

router.post('/register', userMethods.createUser)

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


app.use(passport.initialize())
app.use(passport.session())

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})