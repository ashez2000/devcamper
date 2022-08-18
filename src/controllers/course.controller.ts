import { RequestHandler } from 'express'

import ErrorResponse from '../utils/error.util'
import * as courseService from '../services/courses.service'
import * as bootcampService from '../services/bootcamps.service'

/**
 * Get all courses associated with a bootcamp
 * @route GET /api/v1/bootcamps/:bootcampId/courses
 * @access Public
 */
export const getAllCourse: RequestHandler = async (req, res, next) => {
  try {
    const courses = await courseService.findCourses(req.params.bootcampId)

    res.status(200).json({
      results: courses.length,
      courses,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Get single course
 * @route GET /api/v1/courses/:id
 * @access Public
 */
export const getCourseById: RequestHandler = async (req, res, next) => {
  try {
    const course = await courseService.findCourseById(req.params.id)

    res.status(200).json({
      course,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Create a new course
 * @route POST /api/v1/bootcamps/:bootcampId/courses
 * @access Private
 */
export const createCourse: RequestHandler = async (req, res, next) => {
  try {
    req.body.bootcamp = req.params.bootcampId
    req.body.user = res.locals.user.id

    const bootcamp = await bootcampService.findBootcampById(
      req.params.bootcampId
    )

    if (!bootcamp.user) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with id of ${req.params.bootcampId}`,
          404
        )
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

    const course = await courseService.createCourse(req.body)

    res.status(201).json({
      course,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Update a course
 * @route PUT /api/v1/courses/:id
 * @access Private
 */
export const updateCourse: RequestHandler = async (req, res, next) => {
  try {
    let course = await courseService.findCourseById(req.params.id)

    if (!course.user) {
      return next(
        new ErrorResponse(`You are not authorized to delete this course`, 401)
      )
    }

    if (
      course.user.toString() !== res.locals.user.id &&
      res.locals.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${res.locals.user.id} is not authorized to update this bootcamp`,
          401
        )
      )
    }

    course = await courseService.updateCourse(req.params.id, req.body)

    res.status(200).json({
      course,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc  Delete a course
 * @route DELETE /api/v1/courses/:id
 * @access Private
 */
export const deleteCourse: RequestHandler = async (req, res, next) => {
  try {
    let course = await courseService.findCourseById(req.params.id)

    if (!course.user) {
      return next(
        new ErrorResponse(`You are not authorized to delete this course`, 401)
      )
    }

    if (
      course.user.toString() !== res.locals.user.id &&
      res.locals.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${res.locals.user.id} is not authorized to update this bootcamp`,
          401
        )
      )
    }

    course = await courseService.deleteCourse(req.params.id)

    res.status(200).json({
      course,
    })
  } catch (error) {
    next(error)
  }
}
