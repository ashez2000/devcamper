import { RequestHandler } from 'express'
import * as reviewService from '../services/reviews.service'
import ErrorResponse from '../utils/error.util'

/**
 * Get all reviews
 * @route   GET /api/v1/bootcamps/:bootcampId/reviews
 * @access  Public
 */
export const getReviews: RequestHandler = async (req, res, next) => {
  try {
    const reviews = await reviewService.findReviews(req.params.bootcampId)

    res.status(200).json({
      reviews,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Create a new review
 * @route   POST /api/v1/bootcamps/:bootcampId/reviews
 * @access  Private
 */
export const createReview: RequestHandler = async (req, res, next) => {
  try {
    req.body.bootcamp = req.params.bootcampId
    req.body.user = res.locals.user.id

    const review = await reviewService.createReview(req.body)

    res.status(201).json({
      review,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Update a review
 * @route   PUT /api/v1/bootcamps/:bootcampId/reviews/:id
 * @access  Private
 */
export const updateReview: RequestHandler = async (req, res, next) => {
  try {
    let review = await reviewService.findById(req.params.id)

    if (!review.user) {
      return next(
        new ErrorResponse(`Review not found with id of ${req.params.id}`, 404)
      )
    }

    if (review.user.toString() !== res.locals.user.id) {
      return next(
        new ErrorResponse(
          `User ${res.locals.user.id} is not authorized to update this bootcamp`,
          401
        )
      )
    }

    review = await reviewService.updateReview(req.params.id, req.body)

    res.status(200).json({
      review,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Delete a review
 * @route   DELETE /api/v1/bootcamps/:bootcampId/reviews/:id
 * @access  Private
 */
export const deleteReview: RequestHandler = async (req, res, next) => {
  try {
    let review = await reviewService.findById(req.params.id)

    if (!review.user) {
      return next(
        new ErrorResponse(`Review not found with id of ${req.params.id}`, 404)
      )
    }

    if (review.user.toString() !== res.locals.user.id) {
      return next(
        new ErrorResponse(
          `User ${res.locals.user.id} is not authorized to update this bootcamp`,
          401
        )
      )
    }

    review = await reviewService.deleteReview(req.params.id)

    res.status(200).json({
      review,
    })
  } catch (error) {
    next(error)
  }
}
