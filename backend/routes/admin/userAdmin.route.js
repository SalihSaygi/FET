const express = require('express')
const userAdminRoute = express.Router()
const userMethods = require('../../controllers/user.controller')
const { ensureAdmin } = require('../../config/auth')

userAdminRoute.get('/', ensureAdmin, userMethods.findAllUsers)

module.exports = userAdminRoute