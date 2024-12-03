import { Request, Response } from 'express'

import AppError from '../utils/app-error'
import * as bootcamp from '../bootcamp/bootcamp.service'
import * as review from './review.service'

/**
 * Get reviews
 * @route GET /reviews
 */
export async function getReviews(req: Request, res: Response) {
  const q = req.query as any
  const reviews = await review.findReviews(q)
  res.status(200).json({
    results: reviews.length,
    reviews,
  })
}

/**
 * Get review by id
 * @route GET /reviews/{id}
 */
export async function getReview(req: Request, res: Response) {
  const r = await review.findReview(req.params.id)
  res.status(200).json({
    review: r,
  })
}

/**
 * Create review
 * @route POST /reviews
 */
export async function createReview(req: Request, res: Response) {
  req.body.user = res.locals.user.id

  await bootcamp.findBootcamp(req.body.bootcamp)
  const r = await review.createReview(req.body)
  res.status(201).json({
    review: r,
  })
}

/**
 * Update review
 * @route PUT /reviews/{id}
 */
export async function updateReview(req: Request, res: Response) {
  const curUser = res.locals.user
  const r = await review.findReview(req.params.id)
  if (r.user.toString() != curUser.id && curUser.role != 'admin') {
    throw new AppError('unauthorized', 403)
  }

  const update = await review.updateReview(req.params.id, req.body)
  res.status(200).json({
    review: update,
  })
}

/**
 * Delete review
 * @route DELETE /reviews/{id}
 */
export async function deleteReview(req: Request, res: Response) {
  const curUser = res.locals.user
  const r = await review.findReview(req.params.id)
  if (r.user.toString() != curUser.id && curUser.role != 'admin') {
    throw new AppError('unauthorized', 403)
  }

  await review.deleteReview(req.params.id)
  res.status(200).json({
    review: r,
  })
}
