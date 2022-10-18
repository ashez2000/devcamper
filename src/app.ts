import hpp from 'hpp'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import express from 'express'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'

import ratelimit from './utils/ratelimit.util'
import { swaggerServe, swaggerUi } from './utils/swagger'
import { errorHandler, notFoundHandler } from './error/error.controller'

import authRouter from './auth/auth.router'
import courseRouter from './courses/course.router'
import reviewRouter from './reviews/review.router'
import bootcampRouter from './bootcamp/bootcamp.router'

const app = express()

app.use(ratelimit)
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())

app.use('/api/v1/docs', swaggerServe, swaggerUi)

app.get('/', (req, res) => {
  res.redirect('/api/v1/docs')
})

// app.use('/api/v1/auth', authRouter)
app.use('/api/v1/bootcamps', bootcampRouter)
// app.use('/api/v1/courses', courseRouter)
// app.use('/api/v1/reviews', reviewRouter)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
