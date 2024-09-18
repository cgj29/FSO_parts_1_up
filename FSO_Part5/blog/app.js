const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = config.MONGODB_URI

logger.info('connecting to', url)

mongoose.connect(url)
  .then(() => {
    logger.error('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB', error.message)
  })


app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use(middleware.requestLogger)
/**
 * specify middleware with routes that require token and user
 */

app.use('/api/blogs', blogsRouter)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app