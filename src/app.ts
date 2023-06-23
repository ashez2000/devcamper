import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'
import 'express-async-errors'

import { authRouter } from '$/routes/auth.router'
import { bootcampRouter } from './routes/bootcamp.router'
import { courseRouter } from './routes/course.router'
import { reviewRouter } from './routes/review.router'

import limiter from './services/rate-limiter.service'
import * as error from './middlewares/error.middleware'

const app = express()

app.use(cors())
app.use(helmet())
app.use(hpp())
app.use(limiter)

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.get('/ping', (req, res) => {
  res.send('OK')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/bootcamps', bootcampRouter)
app.use('/api/v1/courses', courseRouter)
app.use('/api/v1/reviews', reviewRouter)

app.use(error.notFound)
app.use(error.globalError)

export { app }
