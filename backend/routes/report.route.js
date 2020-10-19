const express = require('express')
const reportRouter = express.Router()
const reportMethods = require('../controllers/report.controller')

reportRouter.get('/', reportMethods.findAll)
reportRouter.post('/create', reportMethods.create)
reportRouter.get('/:id', reportMethods.findOne)
reportRouter.put('/:id', reportMethods.updatereport)
reportRouter.delete('/:id', reportMethods.delete)

module.exports = reportRouter