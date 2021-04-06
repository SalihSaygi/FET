import express from 'express'
const userRoute = express.Router()
import userMethods from '../../controllers/user.controller'
import { ensureUser } from '../../config/ensureRoles'
// import {  } from '../../config/validation/sign.validation'

userRoute.get('/:userId', ensureUser, userMethods.findOneUser)
userRoute.put('/:userId/edit', ensureUser, userMethods.updateUser)
userRoute.delete('/:userId', ensureUser, userMethods.deleteUser)

export default userRoute