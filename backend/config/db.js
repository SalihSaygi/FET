const mongoose = require('mongoose');
const express = require('express')
const app = express()
const session = require('express-session')
require('dotenv').config({ path: '/backend/.env' })
const MongoStore = require('connect-mongo')(session)
const URI = process.env.URI
mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection is succesful')
})

const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' })
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}))