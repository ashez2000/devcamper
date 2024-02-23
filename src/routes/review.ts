import { Router } from 'express'
import * as review from '@/controllers/review'

const router = Router({ mergeParams: true })

/**
 * @openapi
 * /api/v1/reviews/{reviewId}:
 *  get:
 *   tags:
 *   - Review
 */
router.get('/:id', review.findById)

/**
 * @openapi
 * /api/v1/reviews/{reviewId}:
 *  put:
 *   tags:
 *   - Review
 */
router.put('/:id', review.update)

/**
 * @openapi
 * /api/v1/reviews/{reviewId}:
 *  delete:
 *   tags:
 *   - Review
 */
router.delete('/:id', review.remove)

export default router
