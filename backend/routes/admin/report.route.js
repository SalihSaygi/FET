const express = require('express')
const reportRouter = express.Router()
const reportMethods = require('../controllers/report.controller')

reportRouter.get('/', reportMethods.findAllReports)
reportRouter.post('/create', reportMethods.createReport)
reportRouter.get('/:id', reportMethods.findOneReport)
reportRouter.put('/:id', reportMethods.updateReport)
reportRouter.delete('/:id', reportMethods.deleteReport)

module.exports = reportRouter