import express from 'express'
import cookieParser from 'cookie-parser'
import 'express-async-errors'

import { authRouter } from './app/api/routes/auth.router'
import { bootcampRouter } from './app/api/routes/bootcamp.router'
import { reviewRouter } from './app/api/routes/review.router'

import * as error from './app/api/middlewares/error.middleware'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/bootcamps', bootcampRouter)
app.use('/api/v1/reviews', reviewRouter)

app.use(error.notFound)
app.use(error.globalError)

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})
