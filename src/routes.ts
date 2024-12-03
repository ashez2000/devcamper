import { Router } from 'express'
import authRoutes from './auth/auth.router'

const router = Router()

router.use('/auth', authRoutes)

export default router
