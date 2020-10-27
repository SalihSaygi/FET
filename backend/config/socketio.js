const io = require('socket.io-client')

const rooms = {}

const formatMessage = require('./chatUtils/messages')
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    getUserRooms
} = require('./chatUtils/users')

module.exports = function(socket) {

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
}