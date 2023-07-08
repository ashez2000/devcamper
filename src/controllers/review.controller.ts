import { Request, Response } from 'express'

import { createReviewSchema } from '$/schemas/review.schema'
import * as reviewRepo from '../db/repo/review.repo'

export async function findAllByBootcampId(req: Request, res: Response) {
  const { bootcampId } = req.params

  const reviews = await reviewRepo.findAllByBootcampId(bootcampId, {
    page: parseInt(req.query.page as string) || 1,
    limit: parseInt(req.query.limit as string) || 10,
  })

  res.status(200).json(reviews)
}

export async function create(req: Request, res: Response) {
  const parsedResult = createReviewSchema.safeParse(req.body)
  if (!parsedResult.success) {
    return res.status(400).json(parsedResult.error)
  }

  const review = await reviewRepo.create({
    ...parsedResult.data,
    bootcampId: req.params.bootcampId,
    userId: req.user?.id,
  })

  res.status(201).json(review)
}

export async function update(req: Request, res: Response) {
  const { id } = req.params
  const data = req.body

  const review = await reviewRepo.findById(id)
  if (!review) {
    return res.status(404).json({ message: 'Review not found' })
  }

  if (review.userId !== req.user?.id) {
    return res.status(403).json({ message: 'Not authorized' })
  }

  const updatedReview = await reviewRepo.update(id, data)
  res.status(200).json(updatedReview)
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params

  const review = await reviewRepo.findById(id)
  if (!review) {
    return res.status(404).json({ message: 'Review not found' })
  }

  if (review.userId !== req.user?.id && req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' })
  }

  const deletedReview = await reviewRepo.remove(id)
  res.status(200).json(deletedReview)
}
