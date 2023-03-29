import express = require('express');
import { Role } from '@prisma/client';

import { validate } from '../utils/validator';
import { CreateReviewSchema } from './review.schema';

import { protect, restrictTo } from '../auth/auth.util';
import * as review from './review.controller';

const router = express.Router({ mergeParams: true });

/**
 * @openapi
 * /api/v1/reviews:
 *  get:
 *    tags:
 *      - Reviews
 */
router.get('/', review.getAllReviews);

/**
 * @openapi
 * /api/v1/reviews/{id}:
 *  get:
 *    tags:
 *      - Reviews
 */
router.get('/:id', review.getReview);

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}/reviews:
 *  post:
 *    tags:
 *      - Bootcamps
 */
router.post(
  '/',
  protect,
  restrictTo(Role.USER),
  validate(CreateReviewSchema),
  review.createReview
);

/**
 * @openapi
 * /api/v1/reviews:
 *  put:
 *    tags:
 *      - Reviews
 */
router.put('/:id', protect, restrictTo(Role.USER), review.updateReview);

/**
 * @openapi
 * /api/v1/reviews:
 *  delete:
 *    tags:
 *      - Reviews
 */
router.delete(
  '/:id',
  protect,
  restrictTo(Role.USER, Role.ADMIN),
  review.deleteReview
);

export default router;
