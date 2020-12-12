const express = require('express')
const router = express.Router({ mergeParams: true })

const {
    getReviews,
    getReview,
    addReview,
    updateReview,
    deleteReview
} = require('../controllers/review.controller')

// advanced results
const Review = require('../models/review.model')
const advRes = require('../middlewares/advResults.middleware')
const populate = { path: 'bootcamp', select: 'name description' }

// auth middleware
const { protect, authorize } = require('../middlewares/auth.middleware')

router.route('/')
.get(advRes(Review, populate), getReviews)
.post(protect, authorize('user', 'admin'), addReview)

router.route('/:id')
.get(getReview)
.put(protect, authorize('user', 'admin'), updateReview)
.delete(protect, authorize('user', 'admin'), deleteReview)

module.exports = router
