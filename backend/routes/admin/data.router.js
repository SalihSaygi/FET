const express = require('express')
const dataRouter = express.Router()

const userAdminRouter = require('./userAdmin.route')
const reportAdminRouter = require('./report.route')
const { ensureAdmin } = require('../../config/auth')

dataRouter.use('/', ensureAdmin, (req, res) => {
     res.redirect('/users');
})
dataRouter.use('/users', ensureAdmin, userAdminRouter)
dataRouter.use('/reports', ensureAdmin, reportAdminRouter)

module.exports = dataRouter