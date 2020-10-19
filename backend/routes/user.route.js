const express = require('express')
const userRoute = express.Router()
const userMethods = require('../controllers/user.controller')

userRoute.get('/', userMethods.findAllUsers)
userRoute.post('/create', userMethods.createUser)
userRoute.get('/:id', userMethods.findOneUser)
userRoute.put('/:id', userMethods.updateUser)
userRoute.delete('/:id', userMethods.deleteUser)

module.exports = userRoute