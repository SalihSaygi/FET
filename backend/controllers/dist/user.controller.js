"use strict";
exports.__esModule = true;
exports.updateUser = exports.deleteUser = exports.findAllUsers = exports.findOneUser = exports.createUser = void 0;
var user_model_1 = require("../models/user.model");
var passport_google_1 = require("../config/passport-google");
var bcrypt_1 = require("bcrypt");
var crypto_1 = require("crypto");
var middlewares_helpers_1 = require("../helpers/middlewares.helpers");
exports.createUser = function (req, res) {
    var saltHash = genPassword(req.body.password);
    var salt = saltHash.salt;
    var hash = saltHash.hash;
    if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
        return res.status(400).json({
            message: "Fill in the required fields"
        });
    }
    var user = new user_model_1.User({
        nickname: req.body.nickname,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt_1["default"].hashSync(req.body.password, 10),
        hash: hash,
        salt: salt,
        googleId: passport_google_1.googlePassport.googleId,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        currentRank: req.body.currentRank,
        role: req.body.role,
        address: req.body.adress,
        numberOfFindings: req.body.numberOfFindings,
        profilePhoto: req.body.profilePhoto,
        age: req.body.age,
        pronoun: req.body.pronoun,
        bio: req.body.bio
    });
    var sessionUser = middlewares_helpers_1.sessionizeUser(user);
    req.session.user = sessionUser;
    res.send(sessionUser);
    user.save()
        .then(function (data) {
        res.json(data);
    })["catch"](function (err) {
        res.status(500).json({
            // eslint-disable-next-line no-useless-escape
            message: err.message || "Couldn't save the User for some reason  ¯\_(ツ)_/¯"
        });
    });
};
//Read METHODS
//Finding an user with id
exports.findOneUser = function (req, res) {
    user_model_1.User.findById(req.params.userId)
        .then(function (user) {
        if (!user) {
            return res.status(404).json({
                message: "Couldn't find the user with id: " + req.params.userId
            });
        }
        res.status(200).json({
            message: "Here is the user with id: " + req.params.userId
        }, user);
        console.log(user);
    })["catch"](function (err) {
        return res.status(500).json({
            message: err + "\n| Found it but couldn't retrieve the user with id: " + req.params.userId + " |"
        });
    });
};
exports.findAllUsers = function (req, res) {
    user_model_1.User.find()
        .sort({ name: -1 })
        .then(function (users) {
        res.status(200).json({
            message: "Here is all users"
        }, users);
        console.log(users);
    })["catch"](function (err) {
        res.status(500).json({
            message: err.message || "Couldn't get Users for some reason ¯\\_(ツ)_/¯"
        });
    })
        .limit(20);
};
//Delete METHODS
exports.deleteUser = function (req, res) {
    user_model_1.User.findByIdAndRemove(req.params.userId)
        .then(function (user) {
        if (!user) {
            return res.status(404).json({
                message: "Couldn't find the user with id: " + req.params.userId
            });
        }
        res.status(200).json({
            message: "Deleted the user with id: " + req.params.userId
        });
    })["catch"](function (err) {
        return res.status(500).json({
            message: "Couldn't delete user"
        });
    });
};
exports.updateUser = function (req, res) {
    if (!req.body.email || !req.body.password || !req.body.name) {
        return res.status(400).json({
            message: "Fill in the required fields"
        });
    }
    user_model_1.User.findByIdAndUpdate(req.params.userId, req.body, { "new": true })
        .then(function (user) {
        if (!user) {
            return res.status(404).json({
                message: "Couldn't find the user with id: " + req.params.userId
            });
        }
        res.status(200).json(user);
    })["catch"](function (err) {
        return res.status(200).json({ message: err + "\n| Found it but couldn't retrieve the user with id: " + req.params.userId + " |" });
    });
};
function genPassword(password) {
    var salt = crypto_1["default"].randomBytes(32).toString('hex');
    var genHash = crypto_1["default"].pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        hash: genHash
    };
}
