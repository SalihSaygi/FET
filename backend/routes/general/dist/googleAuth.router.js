"use strict";
exports.__esModule = true;
var express_1 = require("express");
var passport_1 = require("passport");
var googleRouter = express_1["default"].Router();
// @desc    Auth with Google
// @route   GET /auth/google
googleRouter.get('/google', passport_1["default"].authenticate('google', { scope: ['profile'] }));
// @desc    Google auth callback
// @route   GET /auth/google/callback
googleRouter.get('/google/callback', passport_1["default"].authenticate('google', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/dashboard');
});
// @desc    Logout user
// @route   /auth/logout
googleRouter.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
exports["default"] = googleRouter;
