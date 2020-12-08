const express = require('express')
const dataRouter = express.Router()

const userAdminRouter = require('./userAdmin.route')
const reportRouter = require('./report.route')
const { ensureAdmin } = require('../../config/auth')

dataRouter.use('/', ensureAdmin, (req, res) => {
     res.redirect('/users');
})
dataRouter.use('/users', ensureAdmin, userAdminRouter)
dataRouter.use('/reports', ensureAdmin, reportRouter)

module.exports = dataRouter