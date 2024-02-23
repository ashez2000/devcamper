import { RequestHandler } from 'express'

import { AppError } from '@/utils/app-error'
import { getAuthPayload } from '@/helpers/auth'
import { reviewSchema } from '@/schemas/review'
import * as review_repo from '@/repository/review'

/**
 * Find reviews for bootcamp
 * @path GET bootcamps/{bootcampId}/reviews | Public
 */
export const findManyForBootcamp: RequestHandler = async (req, res) => {
  const bootcampId = req.params.bootcampId
  const review = await review_repo.findManyForBootcamp(bootcampId)
  res.status(200).json(review)
}

/**
 * Find review by id
 * @path GET /reviews/{id} | Public
 */
export const findById: RequestHandler = async (req, res) => {
  const id = req.params.id
  const review = await review_repo.findById(id)
  if (!review) {
    throw new AppError('Review not found', 404)
  }

  res.status(200).json(review)
}

/**
 * Create review for bootcamp
 * @path POST bootcamps/{bootcampId}/reviews | Public
 */
export const create: RequestHandler = async (req, res) => {
  const bootcampId = req.params.bootcampId
  const review = await review_repo.findManyForBootcamp(bootcampId)
  res.status(200).json(review)
}

/**
 * Update review
 * @path PUT /reviews/{id} | Private
 */
export const update: RequestHandler = async (req, res) => {
  const id = req.params.id
  const review = await review_repo.findById(id)
  if (!review) {
    throw new AppError('Review not found', 404)
  }

  const auth = getAuthPayload(res)
  if (review.userId !== auth.id && auth.role !== 'ADMIN') {
    throw new AppError('Forbidden', 403)
  }

  const body = reviewSchema.partial().parse(req.body)
  const new_review = await review_repo.update(id, body)
  res.status(201).json(new_review)
}

/**
 * Remove review
 * @path PUT /reviews/{id} | Private
 */
export const remove: RequestHandler = async (req, res) => {
  const id = req.params.id
  const review = await review_repo.findById(id)
  if (!review) {
    throw new AppError('Review not found', 404)
  }

  const auth = getAuthPayload(res)
  if (review.userId !== auth.id && auth.role !== 'ADMIN') {
    throw new AppError('Forbidden', 403)
  }

  await review_repo.remove(id)
  res.status(201).json({})
}
