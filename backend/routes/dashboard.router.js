const express = require('express')
const dashboardRouter = express.Router()

const { ensureAdmin } = require('../config/auth')

const dataRouter = require('./data.router')

dashboardRouter.use('/data', dataRouter)

module.exports = dashboardRouter