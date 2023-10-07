import { Router } from 'express'
import * as auth from '@/controllers/auth'
import * as authCtrl from '@/controllers/auth.controller'

const router = Router()

/**
 * @openapi
 * /api/v1/auth/signup:
 *  post:
 *   tags:
 *   - Auth
 */
router.post('/signup', auth.signup)

/**
 * @openapi
 * /api/v1/auth/signin:
 *  post:
 *   tags:
 *   - Auth
 */
router.post('/signin', authCtrl.signin)

/**
 * @openapi
 * /api/v1/auth/signout:
 *  post:
 *   tags:
 *   - Auth
 */
router.post('/signout', authCtrl.signout)

/**
 * @openapi
 * /api/v1/auth/profile:
 *  post:
 *   tags:
 *   - Auth
 */
router.get('/profile', authCtrl.profile)

/**
 * @openapi
 * /api/v1/auth/forgot-password:
 *  post:
 *   tags:
 *   - Auth
 */
router.post('/forgot-password', authCtrl.forgotPassword)

/**
 * @openapi
 * /api/v1/auth/reset-password/{resetToken}:
 *  put:
 *   tags:
 *   - Auth
 */
router.put('/reset-password/:resetToken', authCtrl.resetPassword)

export default router
