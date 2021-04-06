import ioImport = require('socket.io')
import io = ioImport(server)
import formatMessage = require('../helpers/formatMessages.helper')
import { userJoin, getCurrentUser, userLeave, getRoomUsers, getUserRooms } from '../helpers/socket.users.helper'

//Namespaces

const adminNamespace = io.of('/admin')
const userNamespace = io.of('/user')
const developerNamespace = io.of('/developer')
const animalControlNamespace = io.of('/animalControl')
const dbModerator = io.of('/dbModerator')

exports.user = (socket): void => {
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
    })

    socket.on('new-user', (post, name): void => {
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