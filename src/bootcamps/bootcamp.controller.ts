import { RequestHandler } from 'express'
import * as bootcampService from './bootcamps.service'
import ErrorResponse from '../utils/app-error'

/**
 * Get all bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
export const getBootcamps: RequestHandler = async (req, res, next) => {
  try {
    const bootcamps = await bootcampService.findBootcamps()

    return res.status(200).json({
      results: bootcamps.length,
      bootcamps,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Get single bootcamp
 * @route   GET /api/v1/bootcamps/:id
 * @access  Public
 */
export const getBootcamp: RequestHandler = async (req, res, next) => {
  try {
    const bootcamp = await bootcampService.findBootcampById(req.params.id)
    return res.status(200).json({
      bootcamp,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Create bootcamp
 * @route   POST /api/v1/bootcamps
 * @access  Private
 */
export const createBootcamp: RequestHandler = async (req, res, next) => {
  try {
    req.body.user = res.locals.user.id
    const bootcamp = await bootcampService.createBootcamp(req.body)

    return res.status(201).json({
      bootcamp,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Update bootcamp
 * @route   PUT /api/v1/bootcamps/:id
 * @access  Private
 */
export const updateBootcamp: RequestHandler = async (req, res, next) => {
  try {
    let bootcamp = await bootcampService.findBootcampById(req.params.id)

    if (!bootcamp.user) {
      return new ErrorResponse(
        `You are not authorized to delete this bootcamp`,
        401
      )
    }

    if (
      bootcamp.user.toString() !== res.locals.user.id &&
      res.locals.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${res.locals.user.id} is not authorized to update this bootcamp`,
          401
        )
      )
    }

    bootcamp = await bootcampService.updateBootcamp(req.params.id, req.body)

    return res.status(200).json({
      bootcamp,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Delete bootcamp
 * @route   DELETE /api/v1/bootcamps/:id
 * @access  Private
 */
export const deleteBootcamp: RequestHandler = async (req, res, next) => {
  try {
    const bootcamp = await bootcampService.findBootcampById(req.params.id)

    if (!bootcamp.user) {
      return new ErrorResponse(
        `You are not authorized to delete this bootcamp`,
        401
      )
    }

    if (
      bootcamp.user.toString() !== res.locals.user.id &&
      res.locals.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${res.locals.user.id} is not authorized to delete this bootcamp`,
          401
        )
      )
    }

    bootcamp.remove()

    return res.status(200).json({
      bootcamp,
    })
  } catch (error) {
    next(error)
  }
}
