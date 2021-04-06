import express from 'express'
const dataRouter = express.Router()

import userAdminRouter from './userAdmin.route'
import reportRouter from './report.route'
import { ensureAdmin } from '../../config/auth'

dataRouter.use('/', ensureAdmin, (req, res) => {
     res.redirect('/users');
})
dataRouter.use('/users', ensureAdmin, userAdminRouter)
dataRouter.use('/reports', ensureAdmin, reportRouter)

export default dataRouter