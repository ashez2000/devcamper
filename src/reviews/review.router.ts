import express = require('express')
import * as reviewCtrl from '../controllers/review.controller'
import { protect, restrictTo } from '../middlewares/auth.middleware'

const router = express.Router({ mergeParams: true })

router.route('/').get(reviewCtrl.getReviews).post(reviewCtrl.createReview)

router
  .route('/:id')
  .put(protect, restrictTo('user'), reviewCtrl.updateReview)
  .delete(protect, restrictTo('user', 'admin'), reviewCtrl.deleteReview)

export default router
