import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'
import swaggerUi from 'swagger-ui-express'
import 'express-async-errors'

import authRoutes from '@/routes/auth'
import bootcampRouter from '@/routes/bootcamp'
import reviewRouter from '@/routes/review'

import swaggerSpec from '@/utils/swagger'
import { globalError, notFound } from '@/error'

const app = express()

app.use(cors())
app.use(helmet())
app.use(hpp())

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.get('/', (_, res) => res.redirect('/docs/v1'))
app.get('/health', (_, res) => res.send('OK'))
app.use('/docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/bootcamps', bootcampRouter)
app.use('/api/v1/reviews', reviewRouter)

app.use(notFound)
app.use(globalError)

export default app
