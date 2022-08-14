const path = require('path')
const express = require('express')
const cors = require('cors')
const hpp = require('hpp')
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')

const ErrorResponse = require('./utils/error.util')
const errorHandler = require('./middlewares/error.middleware')
const rateLimit = require('./middlewares/ratelimit.middleware')

const auth = require('./routes/auth.router')
const bootcamps = require('./routes/bootcamp.router')
const courses = require('./routes/course.router')
const reviews = require('./routes/review.router')
const cookieParser = require('cookie-parser')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(cors())
app.use(rateLimit)
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.use('/api/v1/auth', auth)
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/reviews', reviews)

app.all('*', (req, res, next) => {
  return next(
    new ErrorResponse(`Can't find ${req.originalUrl} on this server!`, 404)
  )
})

app.use(errorHandler)

module.exports = app
