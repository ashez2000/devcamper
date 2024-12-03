import { Router } from 'express'
import authRoutes from './auth/auth.router'
import bootcampRoutes from './bootcamp/bootcamp.router'

const router = Router()

router.use('/auth', authRoutes)
router.use('/bootcamps', bootcampRoutes)

export default router
