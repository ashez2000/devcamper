import { Router } from 'express'

import * as bootcamp from '@/controllers/bootcamp'
import * as review from '@/controllers/review'

const router = Router()

/**
 * @openapi
 * /api/v1/bootcamps:
 *  get:
 *   tags:
 *   - Bootcamp
 */
router.get('/', bootcamp.findMany)

/**
 * @openapi
 * /api/v1/bootcamps:
 *  post:
 *   tags:
 *   - Bootcamp
 */
router.post('/', bootcamp.create)

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}:
 *  get:
 *   tags:
 *   - Bootcamp
 */
router.get('/:id', bootcamp.findById)

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}:
 *  put:
 *   tags:
 *   - Bootcamp
 */
router.put('/:id', bootcamp.update)

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}:
 *  delete:
 *   tags:
 *   - Bootcamp
 */
router.delete('/:id', bootcamp.remove)

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}/reviews:
 *  get:
 *   tags:
 *   - Bootcamp
 */
router.get('/:bootcampId/reviews', review.findManyForBootcamp)

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}/reviews:
 *  post:
 *   tags:
 *   - Bootcamp
 */
router.post('/:bootcampId/reviews', review.create)

export default router
