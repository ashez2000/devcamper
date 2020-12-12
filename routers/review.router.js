const express = require('express')
const router = express.Router({ mergeParams: true })

const {
    getReviews,
    getReview,
    addReview
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

module.exports = router
