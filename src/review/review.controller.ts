import { RequestHandler } from 'express'

import prisma from '../utils/prisma'
import AppError from '../utils/app-error'
import asyncHandler from '../utils/async-handler'
import { Review } from '@prisma/client'

/**
 * @desc    Get all reviews
 * @route   GET /api/v1/reviews OR /api/v1/bootcamps/:bootcampId/reviews
 */
export const getAllReviews: RequestHandler = asyncHandler(async (req, res) => {
  let reviews: Review[]

  if (req.params.bootcampId) {
    reviews = await prisma.review.findMany({
      where: {
        bootcampId: req.params.bootcampId,
      },
    })
  } else {
    reviews = await prisma.review.findMany()
  }

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  })
})

/**
 * @desc    Get single review
 * @route   GET /api/v1/reviews/:id
 */
export const getReview: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const review = await prisma.review.findUnique({
      where: {
        id: req.params.id,
      },
    })

    if (!review) {
      return next(new AppError('No review found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        review,
      },
    })
  }
)

/**
 * @desc    Create review
 * @route   POST /api/v1/bootcamps/:bootcampId/reviews
 */
export const createReview: RequestHandler = asyncHandler(async (req, res) => {
  req.body.bootcampId = req.params.bootcampId
  req.body.user = res.locals.user.id

  const review = await prisma.review.create({
    data: req.body,
  })

  res.status(201).json({
    status: 'success',
    message: 'Review created successfully',
    data: {
      review,
    },
  })
})

/**
 * @desc    Update review
 * @route   PUT /api/v1/reviews/:id
 */
export const updateReview: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const review = await prisma.review.findUnique({
      where: {
        id: req.params.id,
      },
    })

    if (!review) {
      return next(new AppError('No review found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'Review updated successfully',
      data: {
        review,
      },
    })
  }
)

/**
 * @desc    Delete review
 * @route   DELETE /api/v1/reviews/:id
 */
export const deleteReview: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const review = await prisma.review.findUnique({
      where: {
        id: req.params.id,
      },
    })

    if (!review) {
      return next(new AppError('No review found with that ID', 404))
    }

    await prisma.review.delete({
      where: {
        id: req.params.id,
      },
    })

    res.status(200).json({
      status: 'success',
      message: 'Review deleted successfully',
    })
  }
)
