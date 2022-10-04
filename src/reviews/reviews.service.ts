import Review from '../models/review.model'
import ErrorResponse from '../utils/app-error'
import type { ReviewInputData } from '../schemas/review.schema'

class ReviewNotFound extends ErrorResponse {
  constructor(id: string) {
    super(`Review with id ${id} not found`, 404)
  }
}

/**
 * Get all reviews
 */
export const findReviews = async (bootcampId: string) => {
  const reviews = await Review.find({ bootcamp: bootcampId })
  return reviews
}

/**
 * Find a review by id
 */
export const findById = async (id: string) => {
  const review = await Review.findById(id)
  if (!review) throw new ReviewNotFound(id)
  return review
}

/**
 * Create a new review
 */
export const createReview = async (data: ReviewInputData) => {
  const review = await Review.create(data)
  return review
}

/**
 * Update a review
 */
export const updateReview = async (id: string, data: any) => {
  const opt = { new: true, runValidators: true }
  const review = await Review.findByIdAndUpdate(id, data, opt)
  if (!review) throw new ReviewNotFound(id)
  return review
}

/**
 * Delete a review
 */
export const deleteReview = async (id: string) => {
  const review = await Review.findByIdAndDelete(id)
  if (!review) throw new ReviewNotFound(id)
  return review
}
