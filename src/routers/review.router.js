const express = require('express')
const reviewCtrl = require('../controllers/review.controller')

const router = express.Router({ mergeParams: true })

router.route('/').get(reviewCtrl.getReviews).post(reviewCtrl.createReview)

router
  .route('/:id')
  .put(reviewCtrl.updateReview)
  .delete(reviewCtrl.deleteReview)

module.exports = router
