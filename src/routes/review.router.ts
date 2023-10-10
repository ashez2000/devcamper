import { Router } from 'express'
import * as review from '@/controllers/reviews'

const router = Router({ mergeParams: true })

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}/reviews:
 *  get:
 *   tags:
 *   - Review
 */
/**
 * @openapi
 * /api/v1/reviews:
 *  get:
 *   tags:
 *   - Review
 */
router.get('/', review.getReviews)

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}/reviews:
 *  post:
 *   tags:
 *   - Review
 */
router.post('/', review.createReview)

/**
 * @openapi
 * /api/v1/reviews/{reviewId}:
 *  put:
 *   tags:
 *   - Review
 */
router.put('/:id', review.updateReview)

/**
 * @openapi
 * /api/v1/reviews/{reviewId}:
 *  delete:
 *   tags:
 *   - Review
 */
router.delete('/:id', review.deleteReview)

export default router
