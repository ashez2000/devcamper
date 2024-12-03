import { Router } from 'express'
import { register, login, logout } from './auth.controller'

const router = Router()

/**
 * @openapi
 * /api/v1/auth/register:
 *  post:
 *    tags:
 *      - Auth
 */
router.post('/register', register)

/**
 * @openapi
 * /api/v1/auth/login:
 *  post:
 *    tags:
 *      - Auth
 */
router.post('/login', login)

/**
 * @openapi
 * /api/v1/auth/logout:
 *  post:
 *    tags:
 *      - Auth
 */
router.post('/logout', logout)

export default router
