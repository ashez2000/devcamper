import { Router } from 'express'
import * as reviewCtrl from '$/controllers/review.controller'

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
router.get('/', reviewCtrl.getReviews)

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}/reviews:
 *  post:
 *   tags:
 *   - Review
 */
router.post('/', reviewCtrl.createReview)

/**
 * @openapi
 * /api/v1/reviews/{reviewId}:
 *  put:
 *   tags:
 *   - Review
 */
router.put('/:id', reviewCtrl.updateReview)

/**
 * @openapi
 * /api/v1/reviews/{reviewId}:
 *  delete:
 *   tags:
 *   - Review
 */
router.delete('/:id', reviewCtrl.deleteReview)

export default router
