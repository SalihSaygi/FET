const express = require('express')
const userRoute = express.Router()
const userMethods = require('../../controllers/user.controller')
const { ensureAdmin } = require('../../config/auth')

userRoute.get('/:userId', userMethods.findOneUser)
userRoute.put('/:userId/edit', userMethods.updateUser)
userRoute.delete('/:userId', userMethods.deleteUser)

module.exports = userRoute