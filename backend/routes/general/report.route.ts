import express from 'express'
const reportRouter = express.Router()
import * as reportMethods from '../../controllers/report.controller'
import { ensureUser } from '../../config/ensureRoles'

reportRouter.get('/', ensureUser, reportMethods.findAllReports)
reportRouter.post('/create', ensureUser, reportMethods.createReport)
reportRouter.get('/results', ensureUser, reportMethods.findOneReport)
reportRouter.put('/', ensureUser, reportMethods.updateReport)
reportRouter.delete('/:reportId', ensureUser, reportMethods.deleteReport)

export default reportRouter