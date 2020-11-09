const express = require('express')
const reportRouter = express.Router()
const reportMethods = require('../controllers/report.controller')
const userAdminRouter = require('./userAdmin.route')
const { ensureUser } = require('../../config/auth')

reportRouter.use('/users', userAdminRouter)

reportRouter.get('/', ensureUser, reportMethods.findAllReports)
reportRouter.post('/create', ensureUser, reportMethods.createReport)
reportRouter.get('/:reportId', ensureUser, reportMethods.findOneReport)
reportRouter.put('/:reportId', ensureUser, reportMethods.updateReport)
reportRouter.delete('/:reportId', ensureUser, reportMethods.deleteReport)

module.exports = reportRouter