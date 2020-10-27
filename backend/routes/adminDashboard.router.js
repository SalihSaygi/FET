const express = require('express')
const adminDashboardRouter = express.Router()

const { ensureAdmin } = require('../config/auth')

const dataRouter = require('./data.router')

adminDashboardRouter.use('/data', ensureAdmin, dataRouter)

module.exports = adminDashboardRouter