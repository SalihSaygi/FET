const express = require('express')
const messagingSettingsRouter = express.Router()
const profileRouter = require('./profile')
const { ensureUser } = require('../../config/auth')



module.exports = messagingSettingsRouter