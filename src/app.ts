import path from 'path'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import hpp from 'hpp'
import cors from 'cors'
import ExpressMongoSanitize from 'express-mongo-sanitize'
// import xss from 'xss-clean'

import ErrorResponse from './utils/error.util'
import errorHandler from './middlewares/error.middleware'
import ratelimit from './utils/ratelimit.util'

import authRouter from './auth/auth.router'
import bootcamp from './bootcamps/bootcamp.router'
import course from './routes/course.router'
import review from './routes/review.router'

const app = express()

// app.use(xss())
app.use(ratelimit)
app.use(helmet())
app.use(ExpressMongoSanitize())
app.use(hpp())
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to Devcamper')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/bootcamps', bootcamp)
// app.use('/api/v1/courses', course)
// app.use('/api/v1/reviews', review)

app.all('*', (req, res, next) => {
  return next(
    new ErrorResponse(`Can't find ${req.originalUrl} on this server!`, 404)
  )
})

app.use(errorHandler)

export default app