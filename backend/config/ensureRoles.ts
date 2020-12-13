import { Request, Response, NextFunction } from "express"

function ensureUser (req, res, next): Object {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
}

function ensureGuest (req, res, next): Object{
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/dashboard');
      }
}

function ensureAdmin (req, res, next): Object {
        if(req.body.role == 'admin') {
            return next()
        } else {
            res.redirect('/admin-dashboard');
        }
    }
}