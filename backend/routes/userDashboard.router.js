const express = require('express')
const userDashboardRouter = express.Router()

const { ensureUser } = require('../config/auth')

const userRouter = require('./user.route')
const reportRouter = require('./report.route')

userDashboardRouter.get(`/settings/profile/username=${userId}`, )