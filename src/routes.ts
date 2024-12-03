import { Router } from 'express'
import authRoutes from './auth/auth.router'
import bootcampRoutes from './bootcamp/bootcamp.router'
import courseRoutes from './course/course.router'

const router = Router()

router.use('/auth', authRoutes)
router.use('/bootcamps', bootcampRoutes)
router.use('/courses', courseRoutes)

export default router
