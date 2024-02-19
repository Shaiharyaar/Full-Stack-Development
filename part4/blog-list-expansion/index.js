const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('express-async-errors')
const app = express()

const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000)

const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')

const { PORT } = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
// adding middlewares
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(express.static('dist'))
// app.use(requestLogger)

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// extract token information and add it in request.token
app.use(middleware.tokenExtractor)

// extract user information add add it in request.user

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

module.exports = app
