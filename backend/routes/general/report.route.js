const express = require('express')
const reportRouter = express.Router()
const reportMethods = require('../../controllers/report.controller')
const { ensureUser } = require('../../config/ensureRoles')

reportRouter.get('/', ensureUser, reportMethods.findAllReports)
reportRouter.post('/create', ensureUser, reportMethods.createReport)
reportRouter.get('/', ensureUser, reportMethods.findOneReport)
reportRouter.put('/:reportId    ', ensureUser, reportMethods.updateReport)
reportRouter.delete('/:reportId', ensureUser, reportMethods.deleteReport)

module.exports = reportRouter