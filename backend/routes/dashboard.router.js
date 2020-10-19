const express = require('express')
const dashboardRouter = express.Router()

const dataRouter = require('./dashboard.router')

dashboardRouter.use('/data', dataRouter)

module.exports = dashboardRouter