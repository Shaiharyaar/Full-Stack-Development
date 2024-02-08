const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('express-async-errors')
const app = express()

const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000)

const blogsRouter = require('./controlllers/blogs')

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

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

module.exports = app
