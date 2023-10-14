import { Router } from 'express'
import * as auth from '@/controllers/auth'

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
router.post('/signin', auth.signin)

/**
 * @openapi
 * /api/v1/auth/signout:
 *  put:
 *   tags:
 *   - Auth
 */
router.put('/signout', auth.signout)

export default router
