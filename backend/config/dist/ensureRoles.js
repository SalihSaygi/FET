"use strict";
exports.__esModule = true;
function ensureUser(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/');
    }
}
function ensureGuest(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/dashboard');
    }
}
function ensureAdmin(req, res, next) {
    if (req.body.role == 'admin') {
        return next();
    }
    else {
        res.redirect('/admin-dashboard');
    }
}
