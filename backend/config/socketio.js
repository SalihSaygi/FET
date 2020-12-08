const io = require('socket.io')

const formatMessage = require('./chatUtils/messages')
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getPostUsers,
    getUserPosts
} = require('./chatUtils/users')

//Namespaces

const adminNamespace = io.of('/admin')
const userNamespace = io.of('/user')
const developerNamespace = io.of('/developer')
const animalControlNamespace = io.of('/animalControl')
const dbModerator = io.of('/dbModerator')

exports.user = (socket) => {
    //Authorization
    io.use((socket, next) => {
        if(socket.request) {
            next()
        } else {
            next(new Error('invalid'))
        }
    })

    socket.on('joinPost', ({ username, post }) => {
        const user = userJoin(socket.id, username, post)

        socket.to(user.post).emit('message', formatMessage(req.geoip, 'Live Chat, \n Connect with People'))

        socket.broadcast.to(user.post).emit('message', formatMessage(req.geoip, `${user.username} has joined the chat`))
    })

    socket.on('new-user', (post, name) => {
        socket.join(post)
        posts[post].users[socket.id] = name
        socket.to(post).broadcast.to('user-connected', name)
    })
    socket.on('send-comment', () => {
        socket.to(post).broadcast.emit('chat-message', {
            message: message,
            name: posts
            [post]
                .users
            [socket.id]
        })
    })
    socket.on('disconnect', () => {
        getUserPosts(socket).forEach(post => {
            socket.to(post).broadcast.emit('user-disconnected', posts[post].users[socket.id])
            delete posts[post].users[socket.id]
        })
    })
}

exports.admin = (socket) => {
    //Authorization + admin auth
    adminNamespace.use(async (socket, next) => {
        const user = await fetchUser(socket.handshake.query)
        if(user.isAdmin) {
            socket.user = user
            next()
        } else {
            next(new Error('Not Admin'))
        }
    }),
    adminNamespace.on('joinPost', ({ username, post }) => {
        const user = postJoin(socket.id, username, post)
        socket.join(user.post)
    })

    adminNamespace.on('new-user', (post, name) => {
        socket.join(post)
        posts[post].users[socket.id] = name
        socket.to(post).broadcast.to('user-connected', name)
    })
    adminNamespace.on('send-message', () => {
        socket.to(post).broadcast.emit('chat-message', {
            message: message,
            name: posts
            [post]
                .users
            [socket.id]
        })
    })
    adminNamespace.on('disconnect', () => {
        getUserPosts(socket).forEach(post => {
            socket.to(post).broadcast.emit('user-disconnected', posts[post].users[socket.id])
            delete posts[post].users[socket.id]
        })
    })
}