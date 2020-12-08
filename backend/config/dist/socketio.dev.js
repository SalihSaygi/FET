"use strict";

var io = require('socket.io');

var formatMessage = require('./chatUtils/messages');

var _require = require('./chatUtils/users'),
    userJoin = _require.userJoin,
    getCurrentUser = _require.getCurrentUser,
    userLeave = _require.userLeave,
    getPostUsers = _require.getPostUsers,
    getUserPosts = _require.getUserPosts; //Namespaces


var adminNamespace = io.of('/admin');
var userNamespace = io.of('/user');
var developerNamespace = io.of('/developer');
var animalControlNamespace = io.of('/animalControl');
var dbModerator = io.of('/dbModerator');

exports.user = function (socket) {
  //Authorization
  io.use(function (socket, next) {
    if (socket.request) {
      next();
    } else {
      next(new Error('invalid'));
    }
  });
  socket.on('joinPost', function (_ref) {
    var username = _ref.username,
        post = _ref.post;
    var user = userJoin(socket.id, username, post);
    socket.to(user.post).emit('message', formatMessage(req.geoip, 'Live Chat, \n Connect with People'));
    socket.broadcast.to(user.post).emit('message', formatMessage(req.geoip, "".concat(user.username, " has joined the chat")));
  });
  socket.on('new-user', function (post, name) {
    socket.join(post);
    posts[post].users[socket.id] = name;
    socket.to(post).broadcast.to('user-connected', name);
  });
  socket.on('send-comment', function () {
    socket.to(post).broadcast.emit('chat-message', {
      message: message,
      name: posts[post].users[socket.id]
    });
  });
  socket.on('disconnect', function () {
    getUserPosts(socket).forEach(function (post) {
      socket.to(post).broadcast.emit('user-disconnected', posts[post].users[socket.id]);
      delete posts[post].users[socket.id];
    });
  });
};

exports.admin = function (socket) {
  //Authorization + admin auth
  adminNamespace.use(function _callee(socket, next) {
    var user;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(fetchUser(socket.handshake.query));

          case 2:
            user = _context.sent;

            if (user.isAdmin) {
              socket.user = user;
              next();
            } else {
              next(new Error('Not Admin'));
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }), adminNamespace.on('joinPost', function (_ref2) {
    var username = _ref2.username,
        post = _ref2.post;
    var user = postJoin(socket.id, username, post);
    socket.join(user.post);
  });
  adminNamespace.on('new-user', function (post, name) {
    socket.join(post);
    posts[post].users[socket.id] = name;
    socket.to(post).broadcast.to('user-connected', name);
  });
  adminNamespace.on('send-message', function () {
    socket.to(post).broadcast.emit('chat-message', {
      message: message,
      name: posts[post].users[socket.id]
    });
  });
  adminNamespace.on('disconnect', function () {
    getUserPosts(socket).forEach(function (post) {
      socket.to(post).broadcast.emit('user-disconnected', posts[post].users[socket.id]);
      delete posts[post].users[socket.id];
    });
  });
};