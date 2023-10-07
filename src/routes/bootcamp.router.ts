import { Router } from 'express'
import * as bootcamps from '@/controllers/bootcamps'

const router = Router()

/**
 * @openapi
 * /api/v1/bootcamps:
 *  get:
 *   tags:
 *   - Bootcamp
 */
router.get('/', bootcamps.getBootcamps)

/**
 * @openapi
 * /api/v1/bootcamps:
 *  post:
 *   tags:
 *   - Bootcamp
 */
router.post('/', bootcamps.createBootcamp)

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}:
 *  get:
 *   tags:
 *   - Bootcamp
 */
router.get('/:id', bootcamps.getBootcamp)

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}:
 *  put:
 *   tags:
 *   - Bootcamp
 */
router.put('/:id', bootcamps.updateBootcamp)

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}:
 *  delete:
 *   tags:
 *   - Bootcamp
 */
router.delete('/:id', bootcamps.deleteBootcamp)

export default router
