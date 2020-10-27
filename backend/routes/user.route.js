const express = require('express')
const userRoute = express.Router()
const userMethods = require('../controllers/user.controller')
const { ensureAdmin } = require('../config/auth')

userRoute.get('/', ensureAdmin, userMethods.findAllUsers)
userRoute.post('/create', userMethods.createUser)
userRoute.get('/:userId', userMethods.findOneUser)
userRoute.put('/settings/:userId', userMethods.updateUser)
userRoute.delete('/:userId', userMethods.deleteUser)

module.exports = userRoute