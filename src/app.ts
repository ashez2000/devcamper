import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import 'express-async-errors'

import { authRouter } from './routes/auth.router'
import { bootcampRouter } from './routes/bootcamp.router'
import { reviewRouter } from './routes/review.router'

import * as error from './middlewares/error.middleware'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/bootcamps', bootcampRouter)
app.use('/api/v1/reviews', reviewRouter)

app.use(error.notFound)
app.use(error.globalError)

export { app }
