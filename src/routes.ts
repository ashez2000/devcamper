import { Router } from 'express'
import authRoutes from './auth/auth.router'
import bootcampRoutes from './bootcamp/bootcamp.router'
import courseRoutes from './course/course.router'
import reviewRoutes from './review/review.router'

const router = Router()

router.use('/auth', authRoutes)
router.use('/bootcamps', bootcampRoutes)
router.use('/courses', courseRoutes)
router.use('/reviews', reviewRoutes)

export default router
