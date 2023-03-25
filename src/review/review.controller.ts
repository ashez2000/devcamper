import { Request, Response } from 'express';

import * as reviewService from './review.service';
import { AppError } from '../error/error.util';
import { getCurrentUser, isAuthorized } from '../auth/auth.util';

/**
 * @desc    Get all reviews
 * @route   GET /api/v1/reviews OR /api/v1/bootcamps/:bootcampId/reviews
 */
export async function getAllReviews(req: Request, res: Response) {
  const { bootcampId } = req.params;
  if (bootcampId) {
    const reviews = await reviewService.getReviewsForBootcamp(bootcampId);
    return res.status(200).json({ data: { reviews } });
  }

  const reviews = await reviewService.getReviews();
  res.status(200).json({ data: { reviews } });
}

/**
 * @desc    Get single review
 * @route   GET /api/v1/reviews/:id
 */
export async function getReview(req: Request, res: Response) {
  const { id } = req.params;

  const review = await reviewService.getReview(id);
  if (!review) {
    throw new AppError('No review found with that ID', 404);
  }

  res.status(200).json({ data: { review } });
}

/**
 * @desc    Create review
 * @route   POST /api/v1/bootcamps/:bootcampId/reviews
 */
export async function createReview(req: Request, res: Response) {
  const currentUser = getCurrentUser(req);

  req.body.bootcampId = req.params.bootcampId;
  req.body.userId = currentUser.id;
  req.body.rating = parseInt(req.body.rating, 10);

  const review = await reviewService.addReview(req.body);

  res.status(201).json({ data: { review } });
}

/**
 * @desc    Update review
 * @route   PUT /api/v1/reviews/:id
 */
export async function updateReview(req: Request, res: Response) {
  const { id } = req.params;
  const currentUser = getCurrentUser(req);

  const review = await reviewService.getReview(id);
  if (!review) {
    throw new AppError('No review found with that ID', 404);
  }

  if (!isAuthorized(review.userId, currentUser)) {
    throw new AppError('Not authorized to update this review', 401);
  }

  const updatedReview = await reviewService.updateReview(id, req.body);

  res.status(200).json({ data: { review: updatedReview } });
}

/**
 * @desc    Delete review
 * @route   DELETE /api/v1/reviews/:id
 */
export async function deleteReview(req: Request, res: Response) {
  const { id } = req.params;
  const currentUser = getCurrentUser(req);

  const review = await reviewService.getReview(id);
  if (!review) {
    throw new AppError('No review found with that ID', 404);
  }

  if (!isAuthorized(review.userId, currentUser)) {
    throw new AppError('Not authorized to update this review', 401);
  }

  await reviewService.deleteReview(id);
  res.status(200).json({ data: {} });
}
