"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ioImport = require("socket.io");
var io = ioImport;
(server);
var socket_users_helper_1 = require("../helpers/socket.users.helper");
//Namespaces
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
        }
        else {
            next(new Error('invalid'));
        }
    });
    socket.on('joinPost', function (_a) {
        var username = _a.username, post = _a.post;
        var user = socket_users_helper_1.userJoin(socket.id, username, post);
    });
    socket.on('new-user', function (post, name) {
        socket.join(post);
        posts[post].users[socket.id] = name;
        socket.to(post).broadcast.to('user-connected', name);
    });
    socket.on('send-comment', function () {
        socket.to(post).broadcast.emit('chat-message', {
            message: message,
            name: posts[post]
                .users[socket.id]
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
    adminNamespace.use(function (socket, next) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchUser(socket.handshake.query)];
                case 1:
                    user = _a.sent();
                    if (user.isAdmin) {
                        socket.user = user;
                        next();
                    }
                    else {
                        next(new Error('Not Admin'));
                    }
                    return [2 /*return*/];
            }
        });
    }); }),
        adminNamespace.on('joinPost', function (_a) {
            var username = _a.username, post = _a.post;
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
            name: posts[post]
                .users[socket.id]
        });
    });
    adminNamespace.on('disconnect', function () {
        getUserPosts(socket).forEach(function (post) {
            socket.to(post).broadcast.emit('user-disconnected', posts[post].users[socket.id]);
            delete posts[post].users[socket.id];
        });
    });
};
