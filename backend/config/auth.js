module.exports = {
    ensureUser: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/dashboard');
      }
    },
    ensureAdmin: function (req, res, next) {
        if(req.body.role == 'admin') {
            return next()
        } else {
            res.redirect('/admin-dashboard');
        }
    }
}