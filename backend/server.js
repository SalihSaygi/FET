//Server Config
const port = process.env.PORT || 3000
const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')
const io = require('socket.io')(5000)

//Server Config
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Dotenv

require('dotenv').config({ path: './.env' })

//Auth Imports

const passport = require('passport')
const session = require('express-session')
const localPassport = require('./config/passport-local')
const googlePassport = require('./config/passport-google')

app.use(passport.initialize())
app.use(passport.session())

//Database Imports

const database = require('./config/db')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session);

//SocketIO Helper Functions
const formatMessage = require('./utils/messages')
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    getUserRooms
} = require('./utils/users')

//Routes

const router = express.Router()
const dashboardRouter = require('./routes/user.route')

app.use('/', router)
app.use('/dashboard', dashboardRouter)

//Location Middleware
const location = require('./utils/location')
app.use(location)

//Google Config
const initializePassport = require('./config/passport-google')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

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
//Start the Server

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})