import { Role } from '@prisma/client'
import { RequestHandler } from 'express'

import prisma from '../utils/prisma'
import asyncHandler from '../utils/async-handler'
import AppError from '../utils/app-error'

/**
 * @desc    Get all bootcamps
 * @route   GET /api/v1/bootcamps
 */
export const getAllBootcamps: RequestHandler = asyncHandler(
  async (req, res) => {
    const bootcamps = await prisma.bootcamp.findMany()

    res.status(200).json({
      status: 'success',
      results: bootcamps.length,
      data: { bootcamps },
    })
  }
)

/**
 * @desc    Get a single bootcamp
 * @route   GET /api/v1/bootcamps/:id
 */
export const getBootcamp: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const bootcamp = await prisma.bootcamp.findUnique({
      where: { id: req.params.id },
    })

    if (!bootcamp) {
      return next(new AppError(`No bootcamp with id ${req.params.id}`, 404))
    }

    return res.status(200).json({
      status: 'success',
      data: { bootcamp },
    })
  }
)

/**
 * @desc    Create a new bootcamp
 * @route   POST /api/v1/bootcamps
 */
export const createBootcamp: RequestHandler = asyncHandler(async (req, res) => {
  req.body.userId = res.locals.user.id

  const bootcamp = await prisma.bootcamp.create({
    data: req.body,
  })

  return res.status(201).json({
    status: 'success',
    message: 'Bootcamp created',
    data: { bootcamp },
  })
})

/**
 * @desc    Update a bootcamp
 * @route   PUT /api/v1/bootcamps/:id
 */
export const updateBootcamp: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const bootcamp = await prisma.bootcamp.findUnique({
      where: { id: req.params.id },
    })

    if (!bootcamp) {
      return next(new AppError(`No bootcamp with id ${req.params.id}`, 404))
    }

    if (!isAuthorized(bootcamp.userId, res.locals.user)) {
      return next(new AppError('Not authorized to update this bootcamp', 401))
    }

    const updatedBootcamp = await prisma.bootcamp.update({
      where: { id: req.params.id },
      data: req.body,
    })

    return res.status(200).json({
      status: 'success',
      message: 'Bootcamp updated successfully',
      data: { bootcamp: updatedBootcamp },
    })
  }
)

/**
 * @desc    Delete a bootcamp
 * @route   DELETE /api/v1/bootcamps/:id
 */
export const deleteBootcamp: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const bootcamp = await prisma.bootcamp.findUnique({
      where: { id: req.params.id },
    })

    if (!bootcamp) {
      return next(new AppError(`No bootcamp with id ${req.params.id}`, 404))
    }

    if (!isAuthorized(bootcamp.userId, res.locals.user)) {
      return next(new AppError('Not authorized to update this bootcamp', 401))
    }

    const deletedBootcamp = await prisma.bootcamp.delete({
      where: { id: req.params.id },
    })

    return res.status(200).json({
      status: 'success',
      message: 'Bootcamp deleted successfully',
      data: { bootcamp: deletedBootcamp },
    })
  }
)

const isAuthorized = (
  bootcampUserId: string,
  currentUser: { id: string; role: Role }
) => {
  return bootcampUserId === currentUser.id || currentUser.role === 'ADMIN'
}
