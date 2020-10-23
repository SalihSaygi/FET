//Server Config
const express = require('express')
const path = require('path')
const http = require('http')
const cors = require('cors')
const io = require('socket.io')(5000)
require('dotenv').config({ path: '.env' })
const cookieSession = require("cookie-session");
const passport = require('passport')
const session = require('express-session')
const localPassport = require('./config/passport-local')
require('./config/passport-google')(passport)
const mongoose = require('mongoose')
const database = require('./config/db')
const MongoStore = require('connect-mongo')(session)
const app = express()
const server = http.createServer(app)
//Server Config
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    //one day
    keys:[process.env.Cookie_KEY]
  }));

app.use(
    session({
      secret: process.env.SECRET_SESSION,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

const port = process.env.PORT || 3000

//Auth Imports



localPassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

//Database Imports

;

//Routes

const { ensureUser, ensureGuest } = require('./config/auth')

const router = express.Router()
const dashboardRouter = require('./routes/user.route')
const googleAuthRouter = require('./routes/googleAuth.router')

app.use('/', ensureGuest, router)
app.use('/dashboard', ensureUser, dashboardRouter)
app.use('auth', googleAuthRouter)

//Location Middleware
const location = require('./chatUtils/location')
app.use(location)

//SocketIO
io.use((socket, next) => {
    if(isValid(socket.request)) {
        next()
    } else {
        next(new Error('invalid'))
    }
})

const adminNameS = io.of('/admin')

adminNameS.use(async (socket, next) => {
    const user = await fetchUser(socket.handshake.query)
    if(user.isAdmin) {
        socket.user = user
        next()
    } else {
        next(new Error('Not Admin'))
    }
})

const customNameS = io.of(/[^A-Za-z0-9]+/g)

io.on('connection', socket => {
    const customNameS = socket.nsp
    require('./socketio')(socket)

    return io
})

app.use(passport.initialize())
app.use(passport.session())

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})