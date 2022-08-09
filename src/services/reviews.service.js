const Review = require('../models/review.model')
const ErrorResponse = require('../utils/error.util')

class ReviewNotFound extends ErrorResponse {
  constructor(id) {
    super(`Review with id ${id} not found`, 404)
  }
}

/**
 * @desc    Get all reviews
 * @param {string} bootcampId
 * @returns {Promise<Review[]>} reviews
 */
exports.find = async (bootcampId) => {
  const reviews = await Review.find({ bootcamp: bootcampId })
  return reviews
}

/**
 * @desc Find a review by id
 * @param {string} id
 * @returns {Promise<Review>} review
 */
exports.findById = async (id) => {
  const review = await Review.findById(id)
  if (!review) throw new ReviewNotFound(id)
  return review
}

/**
 * @desc Create a new review
 * @param {object} data
 * @returns {Promise<Review>} review
 */
exports.create = async (data) => {
  const review = await Review.create(data)
  return review
}

/**
 * @desc Update a review
 * @param {string} id
 * @param {object} data
 * @returns {Promise<Review>} review
 */
exports.update = async (id, data) => {
  const opt = { new: true, runValidators: true }
  const review = await Review.findByIdAndUpdate(id, data, opt)
  if (!review) throw new ReviewNotFound(id)
  return review
}

/**
 * @desc Delete a review
 * @param {string} id
 * @returns {Promise<Review>} review
 */
exports.delete = async (id) => {
  const review = await Review.findByIdAndDelete(id)
  if (!review) throw new ReviewNotFound(id)
  return review
}
