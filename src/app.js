const express = require('express')
const cors = require('cors')
const hpp = require('hpp')
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')

const errorHandler = require('./middlewares/error.middleware')
const rateLimit = require('./middlewares/ratelimit.middleware')

const auth = require('./routers/auth.router')
const bootcamps = require('./routers/bootcamp.router')
// const courses = require('./routers/course.router');
// const users = require('./routers/user.router');
// const reviews = require('./routers/review.router');

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(cors())
app.use(rateLimit)
app.use(express.json())

app.use('/api/v1/auth', auth)
app.use('/api/bootcamps', bootcamps)
// app.use('/api/courses', courses);
// app.use('/api/users', users);
// app.use('/api/reviews', reviews);

app.all('*', (req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Can't find ${req.originalUrl} on this server!`,
  })
})

app.use(errorHandler)

module.exports = app
