const express = require('express')
const userAdminRoute = express.Router()
const userMethods = require('../../controllers/user.controller')
const { ensureAdmin } = require('../../config/ensureRoles')
const userRouter = require('../general/user.route')

userAdminRoute.get('/', ensureAdmin, userMethods.findAllUsers)
userAdminRoute.use('/', ensureAdmin, userRouter)

module.exports = userAdminRoute