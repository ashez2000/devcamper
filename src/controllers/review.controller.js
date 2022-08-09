const reviewService = require('../services/reviews.service')
const asyncHandler = require('../middlewares/async.middleware')

/**
 * @desc    Get all reviews
 * @route   GET /api/v1/bootcamps/:bootcampId/reviews
 * @access  Public
 */
exports.getReviews = asyncHandler(async (req, res, next) => {
  const reviews = await reviewService.find(req.params.bootcampId)

  res.status(200).json({
    reviews,
  })
})

/**
 * @desc    Create a new review
 * @route   POST /api/v1/bootcamps/:bootcampId/reviews
 * @access  Private
 */
exports.createReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId
  req.body.user = req.user.id

  const review = await reviewService.create(req.body)

  res.status(201).json({
    review,
  })
})

/**
 * @desc    Update a review
 * @route   PUT /api/v1/bootcamps/:bootcampId/reviews/:id
 * @access  Private
 */
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await reviewService.findById(req.params.id)

  if (review.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this bootcamp`,
        401
      )
    )
  }

  review = await reviewService.update(req.params.id, req.body)

  res.status(200).json({
    review,
  })
})

/**
 * @desc    Delete a review
 * @route   DELETE /api/v1/bootcamps/:bootcampId/reviews/:id
 * @access  Private
 */
exports.deleteReview = asyncHandler(async (req, res, next) => {
  let review = await reviewService.findById(req.params.id)

  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this bootcamp`,
        401
      )
    )
  }

  review = await reviewService.delete(req.params.id)

  res.status(200).json({
    review,
  })
})
