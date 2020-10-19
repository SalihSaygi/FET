const express = require('express')
const userRouter = express.Router()
const userMethods = require('../controllers/user.controller')

userRouter.get('/', userMethods.findAll)
userRouter.post('/', userMethods.create)
userRouter.get('/id', userMethods.findOne)
userRouter.put('/id', userMethods.updateUser)
userRouter.delete('/id', userMethods.delete)

module.exports = userRouter