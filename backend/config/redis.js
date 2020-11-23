//SET TIMES

const ONE_HOUR = 1000 * 60 * 60

const HALF_HOUR = ONE_HOUR / 2

const SIX_HOURS = ONE_HOUR * 6

const ioredis = require('ioredis')

//RedisStore

const {
    REDIS_PORT = 6379,
    REDIS_HOST = 'localhost',
    REDIS_PASSWORD = 'secretKey1'
} = process.env

const REDIS_OPTIONS = {
    port: +REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD
}

//RedisSession
const session = require('express-session')

const {
    SESSION_SECRET = 'reallySecretSessionPass1',
    SESSION_NAME = 'SID',
    SESSION_IDLE_TIMEOUT = HALF_HOUR
} = process.env

const {
    NODE_ENV = 'development'
} = process.env

const IN_PROD = NODE_ENV === 'production'

const SESSION_OPTIONS = {
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    cookie: {
        maxAge: +SESSION_IDLE_TIMEOUT,
        secure: IN_PROD,
        sameSite: true
    },
    rolling: true,
    resave: false,
    saveUninitialize: false
}

module.exports = REDIS_OPTIONS, SESSION_OPTIONS