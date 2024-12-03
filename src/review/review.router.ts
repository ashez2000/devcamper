import { Router } from 'express'
import { protect, restrictTo } from '../middlewares/auth.middleware'
import * as reviewHandler from './review.controller'

const router = Router()

/**
 * @openapi
 * /api/v1/reviews:
 *  get:
 *    tags:
 *      - Reviews
 */
router.get('/', reviewHandler.getReviews)

/**
 * @openapi
 * /api/v1/reviews/{id}:
 *  get:
 *    tags:
 *      - Reviews
 */
router.get('/:id', reviewHandler.getReview)

/**
 * @openapi
 * /api/v1/reviews:
 *  post:
 *    tags:
 *      - Courses
 */
router.post(
  '/',
  protect,
  restrictTo('user', 'admin'),
  reviewHandler.createReview
)

/**
 * @openapi
 * /api/v1/reviews/{id}:
 *  put:
 *    tags:
 *      - Reviews
 */
router.put(
  '/:id',
  protect,
  restrictTo('user', 'admin'),
  reviewHandler.updateReview
)

/**
 * @openapi
 * /api/v1/reviews/{id}:
 *  delete:
 *    tags:
 *      - Reviews
 */
router.delete(
  '/:id',
  protect,
  restrictTo('review', 'admin'),
  reviewHandler.deleteReview
)

export default router
