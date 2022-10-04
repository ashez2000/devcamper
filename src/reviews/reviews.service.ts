import Review from './review.model'
import AppError from '../utils/app-error'
import { CreateReviewDto } from './review.dto'

/**
 * Find all reviews for bootcamp
 */
export const findReviewsForBootcamp = async (bootcampId: string) => {
  const reviews = await Review.find({ bootcamp: bootcampId })
  return reviews
}

/**
 * Find a review by id
 */
export const findReviewById = async (id: string) => {
  const review = await Review.findById(id)
  if (!review) throw new AppError(`Review not found with id of ${id}`, 404)

  return review
}

/**
 * Create new review
 */
export const createReview = async (data: CreateReviewDto) => {
  const review = await Review.create(data)
  return review
}

/**
 * Delete a review by id
 */
export const deleteReviewById = async (id: string) => {
  const review = await Review.findByIdAndDelete(id)
  if (!review) throw new AppError(`Review not found with id of ${id}`, 404)
  return review
}
