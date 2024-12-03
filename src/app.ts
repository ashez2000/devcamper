import hpp from 'hpp'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import express from 'express'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import 'express-async-errors'

import ratelimit from './utils/ratelimit.util'
import { swaggerServe, swaggerUi } from './utils/swagger'
import { errorHandler, notFoundHandler } from './middlewares/error.middleware'
import routes from './routes'

const app = express()

// Global middlewares
app.use(ratelimit)
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())

app.get('/health', (req, res) => {
  res.send('OK')
})

// Swagger Docs
app.use('/api/v1/docs', swaggerServe, swaggerUi)
app.get('/', (req, res) => {
  res.redirect('/api/v1/docs')
})

// Main routes
app.use('/api/v1', routes)

// Error handling
app.use(notFoundHandler)
app.use(errorHandler)

export default app
