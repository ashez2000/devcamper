import hpp from 'hpp'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import express from 'express'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'
import 'express-async-errors'

import { swaggerServe, swaggerUi } from './utils/swagger'
import { errorHandler, notFoundHandler } from './middlewares/error.middleware'
import routes from './routes'
import { ratelimitConfig } from './config'

const app = express()

// Global middlewares
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())

// Ratelimt
app.use(
  rateLimit({
    windowMs: ratelimitConfig.windowMs,
    max: ratelimitConfig.max,
  })
)

// Swagger Docs
app.use('/api/v1/docs', swaggerServe, swaggerUi)
app.get('/', (req, res) => res.redirect('/api/v1/docs'))
app.get('/docs', (req, res) => res.redirect('/api/v1/docs'))

// Main routes
app.get('/health', (req, res) => res.send('OK'))
app.use('/api/v1', routes)

// Error handling
app.use(notFoundHandler)
app.use(errorHandler)

export default app
