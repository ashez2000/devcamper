import path from 'path'

import hpp from 'hpp'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import express from 'express'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'

import ratelimit from './utils/ratelimit.util'
import { errorHandler, notFoundHandler } from './utils/error-handler'

// import course from './courses/course.router'
// import review from './reviews/review.router'
// import bootcamp from './bootcamps/bootcamp.router'
import authRouter from './auth/auth.router'

const app = express()

app.use(ratelimit)
app.use(helmet())
app.use(mongoSanitize())
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
// app.use('/api/v1/bootcamps', bootcamp)
// app.use('/api/v1/courses', course)
// app.use('/api/v1/reviews', review)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
