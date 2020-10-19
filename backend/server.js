const express = require('express')
const path = require('path')
const http = require('http')
const formatMessage = require('./utils/messages')
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    getUserRooms
} = require('./utils/users')
const where = require('node-where')
const cors = require('cors')
const mongoose = require('mongoose');
const app = express()
const server = http.createServer(app)
require('dotenv').config({ path: './.env' })
const port = process.env.PORT || 3000
const database = require('./config/db')
const dashboardRouter = require('./routes/dashboard.router')

app.get('/dashboard', dashboardRouter)

app.use(cors())
app.use(express.json())

//LocationMiddleware

const botName = (req, res, next) => {
    where.is(req.ip, function (err, result) {
        if (result) {
            const cityName = result.get('city')
            console.log(cityName)
            const stateName = result.get('region')
            const zipCode = result.get('\n postalCode')
            const adress = cityName + stateName + zipCode
            req.geoip = adress
        }
        if (err) {
            res.status(500).send(err.message ? err.message : 'location error')
            next(err)
        }
        next()
    })
}

app.use(botName)
console.log(botName)

//Socket

const io = require('socket.io')(5000)
io.use((socket, next) => {
    if(isValid(socket.request)) {
        next()
    } else {
        next(new Error('invalid'))
    }
})

const rooms = {}

//admin
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

//custom NameSpaces (Groups/Teams/Tags)

const customNameS = io.of(/[^A-Za-z0-9]+/g)

io.on('connection', socket => {
    const customName = socket.nsp
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room)

        socket.join(user.room)

        socket.to(user.room).emit('message', formatMessage(req.geoip, 'Live Chat, \n Connect with People'))

        socket.broadcast.to(user.room).emit('message', formatMessage(req.geoip, `${user.username} has joined the chat`))
    })

    socket.on('new-user', (room, name) => {
        socket.join(room)
        rooms[room].users[socket.id] = name
        socket.to(room).broadcast.to('user-connected', name)
    })
    socket.on('send-message', () => {
        socket.to(room).broadcast.emit('chat-message', {
            message: message,
            name: rooms
            [room]
                .users
            [socket.id]
        })
    })
    socket.on('disconnect', () => {
        getUserRooms(socket).forEach(room => {
            socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
            delete rooms[room].users[socket.id]
        })
    })
})

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})