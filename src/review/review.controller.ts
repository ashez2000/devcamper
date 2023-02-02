import { RequestHandler } from 'express';

import * as reviewService from './review.service';
import { getCurrentUser, isAuthorized } from '../auth/auth.util';
import AppError from '../utils/app-error';

/**
 * @desc    Get all reviews
 * @route   GET /api/v1/reviews OR /api/v1/bootcamps/:bootcampId/reviews
 */
export const getAllReviews: RequestHandler = async (req, res) => {
  const { bootcampId } = req.params;
  if (bootcampId) {
    const reviews = await reviewService.getReviewsForBootcamp(bootcampId);
    return res.status(200).json({ data: { reviews } });
  }

  const reviews = await reviewService.getAllReviews();
  return res.status(200).json({ data: { reviews } });
};

/**
 * @desc    Get single review
 * @route   GET /api/v1/reviews/:id
 */
export const getReview: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const review = await reviewService.getReview(id);
  if (!review) throw new AppError('No review found with that ID', 404);

  return res.status(200).json({ data: { review } });
};

/**
 * @desc    Create review
 * @route   POST /api/v1/bootcamps/:bootcampId/reviews
 */
export const createReview: RequestHandler = async (req, res) => {
  const currentUser = getCurrentUser(req);
  req.body.bootcampId = req.params.bootcampId;
  req.body.user = currentUser.id;

  const review = await reviewService.createReview(req.body);

  return res.status(201).json({ data: { review } });
};

/**
 * @desc    Update review
 * @route   PUT /api/v1/reviews/:id
 */
export const updateReview: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const currentUser = getCurrentUser(req);

  const review = await reviewService.getReview(id);
  if (!review) throw new AppError('No review found with that ID', 404);

  if (!isAuthorized(review.userId, currentUser))
    throw new AppError('Not authorized to update this review', 401);

  const updatedReview = await reviewService.updateReview(id, req.body);

  return res.status(200).json({ data: { review: updatedReview } });
};

/**
 * @desc    Delete review
 * @route   DELETE /api/v1/reviews/:id
 */
export const deleteReview: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const currentUser = getCurrentUser(req);

  const review = await reviewService.getReview(id);
  if (!review) throw new AppError('No review found with that ID', 404);

  if (!isAuthorized(review.userId, currentUser))
    throw new AppError('Not authorized to update this review', 401);

  await reviewService.deleteReview(id);
  return res.status(200).json({ data: {} });
};
