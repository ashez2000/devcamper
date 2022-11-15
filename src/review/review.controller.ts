import { RequestHandler } from 'express'

import AppError from '../utils/app-error'
import asyncHandler from '../utils/async-handler'
import {
  findReviewsForBootcamp,
  createReview,
  findReviewById,
  deleteReviewById,
} from './review.service'
import { isAuthorized } from '../auth/auth.utils'

/**
 * Get all reviews for bootcamp handler
 */
export const getReviewsForBootcampHandler: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const reviews = await findReviewsForBootcamp(req.params.bootcampId)

    res.status(200).json({
      reviews,
    })
  }
)

/**
 * Create new review for bootcamp handler
 */
export const createReviewHandler: RequestHandler = asyncHandler(
  async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId
    req.body.user = res.locals.user.id

    const review = await createReview(req.body)

    res.status(201).json({
      review,
    })
  }
)

/**
 * Delete a review by id handler
 */
export const deleteReviewHandler: RequestHandler = asyncHandler(
  async (req, res, next) => {
    let review = await findReviewById(req.params.id)

    if (!isAuthorized(review.user, res.locals.user)) {
      throw new AppError('Not authorized to delete this review', 401)
    }

    review = await deleteReviewById(req.params.id)

    res.status(200).json({
      review,
    })
  }
)
