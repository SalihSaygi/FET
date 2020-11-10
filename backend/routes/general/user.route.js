const express = require('express')
const userRoute = express.Router()
const userMethods = require('../../controllers/user.controller')
const { ensureUser } = require('../../config/ensureRoles')

userRoute.get('/:userId', ensureUser, userMethods.findOneUser)
userRoute.put('/:userId/edit', ensureUser, userMethods.updateUser)
userRoute.delete('/:userId', ensureUser, userMethods.deleteUser)

module.exports = userRoute