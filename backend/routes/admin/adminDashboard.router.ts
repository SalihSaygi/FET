import express from 'express'
const adminDashboardRouter = express.Router()

import { ensureAdmin } from '../../config/ensureRoles'

import dataRouter from './data.router'

adminDashboardRouter.use('/data', ensureAdmin, dataRouter)

export default adminDashboardRouter