const express = require('express')
const reviewCtrl = require('../controllers/review.controller')
const { protect, restrictTo } = require('../middlewares/auth.middleware')

const router = express.Router({ mergeParams: true })

router.route('/').get(reviewCtrl.getReviews).post(reviewCtrl.createReview)

router
  .route('/:id')
  .put(protect, restrictTo('user'), reviewCtrl.updateReview)
  .delete(protect, restrictTo('user', 'admin'), reviewCtrl.deleteReview)

module.exports = router
