import express = require('express')
import { protect, restrictTo } from '../auth/auth.controller'
import {
  getReviewsForBootcampHandler,
  createReviewHandler,
  deleteReviewHandler,
} from './review.controller'

const router = express.Router()

router.get('/bootcamps/:bootcampId/reviews', getReviewsForBootcampHandler)

router.post(
  '/bootcamps/:bootcampId/reviews',
  protect,
  restrictTo('user'),
  createReviewHandler
)

router.delete(
  '/reviews/:id',
  protect,
  restrictTo('user', 'admin'),
  deleteReviewHandler
)

export default router
