import { RequestHandler } from 'express'

import AppError from '../utils/app-error'
import asyncHandler from '../utils/async-handler'
import { isAuthorized } from '../auth/auth.utils'
import {
  findAllCourse,
  findAllCourseForBootcamp,
  findCourseById,
  createCourse,
  updateCourseById,
  deleteCourseById,
} from './courses.service'
import { findBootcampById } from '../bootcamp/bootcamp.service'

/** Get courses Handler */
export const getAllCourseHandler: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const q = req.query as any

    const courses = await findAllCourse(q)

    res.status(200).json({
      results: courses.length,
      courses,
    })
  }
)

/** Get courses associated with a bootcamp Handler */
export const getAllCourseForBootcampHandler: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const courses = await findAllCourseForBootcamp(req.params.bootcampId)

    res.status(200).json({
      results: courses.length,
      courses,
    })
  }
)

/** Get course by id Handler */
export const getCourseByIdHandler: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const course = await findCourseById(req.params.id)

    res.status(200).json({
      course,
    })
  }
)

/** Create a new course Handler */
export const createCourseHandler: RequestHandler = asyncHandler(
  async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId
    // req.body.user = res.locals.user.id

    await findBootcampById(req.params.bootcampId)

    const course = await createCourse(req.body)

    res.status(201).json({
      course,
    })
  }
)

/** Update course by id Handler */
export const updateCourseByIdHandler: RequestHandler = asyncHandler(
  async (req, res, next) => {
    let course = await findCourseById(req.params.id)

    // if (!isAuthorized(course.user, res.locals.user.id)) {
    //   return next(new AppError('Not authorized to update this course', 401))
    // }

    course = await updateCourseById(req.params.id, req.body)

    res.status(200).json({
      course,
    })
  }
)

/** Delete course by id handler */
export const deleteCourseByIdHandler: RequestHandler = asyncHandler(
  async (req, res, next) => {
    let course = await findCourseById(req.params.id)

    // if (!isAuthorized(course.user, res.locals.user)) {
    //   return next(new AppError('Not authorized to delete this course', 401))
    // }

    await deleteCourseById(req.params.id)

    res.status(200).json({
      course,
    })
  }
)
