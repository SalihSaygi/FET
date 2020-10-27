const mongoose = require('mongoose');
const express = require('express')
const app = express()
require('dotenv').config({ path: '.env' })
const URI = process.env.URI
exports.connection = mongoose.connect("mongodb://localhost/mern-stack", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection is succesful')
})

module.exports = mongoose