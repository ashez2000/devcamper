import 'express-async-errors'

import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'

import authRouter from '$/routes/auth.router'
// import bootcampRouter from '$/routes/bootcamp.router'
// import courseRouter from '$/routes/course.router'
// import reviewRouter from '$/routes/review.router'

import { globalError, notFound } from './error'

const app = express()

app.use(cors())
app.use(helmet())
app.use(hpp())

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.get('/', (_, res) => res.redirect('/api/v1/docs'))
app.get('/ping', (_, res) => res.send('OK'))

app.use('/api/v1/auth', authRouter)
// app.use('/api/v1/bootcamps', bootcampRouter)
// app.use('/api/v1/courses', courseRouter)
// app.use('/api/v1/reviews', reviewRouter)

app.use(notFound)
app.use(globalError)

export { app }
