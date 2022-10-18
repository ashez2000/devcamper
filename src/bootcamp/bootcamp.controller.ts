import { RequestHandler } from 'express'

import asyncHandler from '../utils/async-handler'
import AppError from '../utils/app-error'
import {
  findAllBootcamp,
  findBootcampById,
  findBootcampWithinRadius,
  createBootcamp,
  updateBootcampById,
} from './bootcamp.service'
import { isAuthorized } from '../auth/auth.utils'

/** Get all bootcamps handler */
export const getAllBootcampHandler: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const bootcamps = await findAllBootcamp()

    return res.status(200).json({
      results: bootcamps.length,
      bootcamps,
    })
  }
)

/** Get single bootcamp handler */
export const getBootcampByIdHandler: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const bootcamp = await findBootcampById(req.params.id)
    return res.status(200).json({
      bootcamp,
    })
  } catch (error) {
    next(error)
  }
}

/** Get Bootcamps within radius */
export const getBootcampWithinRadiusHandler: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const { zipcode, distance } = req.params

    const bootcamps = await findBootcampWithinRadius(
      zipcode,
      parseInt(distance)
    )

    return res.status(200).json({
      results: bootcamps.length,
      bootcamps,
    })
  }
)

/**
 * Create bootcamp handler
 */
export const createBootcampHandler: RequestHandler = async (req, res, next) => {
  try {
    req.body.user = res.locals.user.id
    const bootcamp = await createBootcamp(req.body)

    return res.status(201).json({
      bootcamp,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Update bootcamp handler
 */
export const updateBootcampByIdHandler: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const currentUser = res.locals.user
    let bootcamp = await findBootcampById(req.params.id)

    if (!isAuthorized(bootcamp.user, currentUser)) {
      return next(new AppError(`User:${currentUser.id} is not authorized`, 401))
    }

    bootcamp = await updateBootcampById(req.params.id, req.body)

    return res.status(200).json({
      bootcamp,
    })
  }
)
