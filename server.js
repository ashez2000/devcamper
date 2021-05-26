const dotenv = require('dotenv')
const express = require('express')

const connectDb = require('./db')
const errorHandler = require('./middlewares/error.middleware')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('./middlewares/ratelimit.middleware')
const hpp = require('hpp')
const cors = require('cors')

// routes
const bootcamps = require('./routers/bootcamp.router')
const courses = require('./routers/course.router')
const auth = require('./routers/auth.router')
const users = require('./routers/user.router')
const reviews = require('./routers/review.router')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
connectDb()

// app config
app.use(express.json())
app.use(mongoSanitize())
app.use(helmet())
app.use(xss())
app.use(rateLimit)
app.use(hpp())
app.use(cors())

// routes
app.use('/api/bootcamps', bootcamps)
app.use('/api/courses', courses)
app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/api/reviews', reviews)

app.use(errorHandler)

// server
app.listen(PORT, () => {
  console.log(`Bootcamp APi | PORT: ${PORT}`)
  console.log(`Server running ${process.env.NODE_ENV} mode`)
})

/* 
  env vars:

  NODE_ENV
  GEO_KEY
  GEO_PROVIDER
  JWT_EXP
  JWT_KEY
  MONGO_URI
*/
