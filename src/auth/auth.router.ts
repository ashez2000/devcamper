import express from 'express'
import * as auth from './auth.controller'
import { protect } from '../auth/auth.util'

const router = express.Router()

/**
 * @openapi
 * /api/v1/auth/signup:
 *  post:
 *    tags:
 *      - Auth
 */
router.post('/signup', auth.signup)

/**
 * @openapi
 * /api/v1/auth/signin:
 *  post:
 *    tags:
 *      - Auth
 */
router.post('/signin', auth.signin)

/**
 * @openapi
 * /api/v1/auth/profile:
 *  get:
 *    tags:
 *      - Auth
 */
router.get('/profile', protect, auth.profile)

export default router
