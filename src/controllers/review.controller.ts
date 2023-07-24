import { Request, Response } from 'express'
import { AppError } from '$/utils/app-error.util'
import Review from '$/models/review.model'

// Get all reviews
export async function getReviews(req: Request, res: Response) {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId })
    return res.status(200).json({ data: reviews })
  }

  const reviews = await Review.find()
  res.status(200).json({ data: reviews })
}

// Get review by id
export async function getReview(req: Request, res: Response) {
  const review = await Review.findById(req.params.id)
  if (!review) throw new AppError('Review not found', 404)

  res.status(200).json({ data: review })
}

// Create new review
export async function createReview(req: Request, res: Response) {
  if (!req.user) throw new AppError('Unauthorized', 401)

  req.body.bootcamp = req.params.bootcampId
  req.body.user = req.user.id

  const review = await Review.create(req.body)
  res.status(201).json({ data: review })
}

// Update review by id
export async function updateReview(req: Request, res: Response) {
  if (!req.user) throw new AppError('Unauthorized', 401)

  const review = await Review.findById(req.params.id)
  if (!review) throw new AppError('Review not found', 404)

  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new AppError('Unauthorized', 401)
  }

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )

  res.status(200).json({ data: updatedReview })
}

// Delete review by id
export async function deleteReview(req: Request, res: Response) {
  if (!req.user) throw new AppError('Unauthorized', 401)

  const review = await Review.findById(req.params.id)
  if (!review) throw new AppError('Review not found', 404)

  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new AppError('Unauthorized', 401)
  }

  const deletedReview = await review.deleteOne()
  res.status(204).json({ data: deletedReview })
}
