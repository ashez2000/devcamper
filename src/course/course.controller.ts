import { RequestHandler } from 'express'
import { Course } from '@prisma/client'

import prisma from '../utils/prisma'
import asyncHandler from '../utils/async-handler'
import AppError from '../utils/app-error'

/**
 * @desc    Get all courses
 * @route   GET /api/v1/courses OR /api/v1/bootcamps/:bootcampId/courses
 */
export const getAllCourse: RequestHandler = asyncHandler(async (req, res) => {
  let courses: Course[]

  if (req.params.bootcampId) {
    courses = await prisma.course.findMany({
      where: {
        bootcampId: req.params.bootcampId,
      },
    })
  } else {
    courses = await prisma.course.findMany()
  }

  res.status(200).json({
    success: true,
    results: courses.length,
    data: courses,
  })
})

/**
 * @desc    Get a single course
 * @route   GET /api/v1/courses/:id
 */
export const getCourse: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
    })

    if (!course) {
      return next(
        new AppError(`Course not found with id ${req.params.id}`, 404)
      )
    }

    res.status(200).json({
      status: 'success',
      data: course,
    })
  }
)

/**
 * @desc    Create a course
 * @route   POST /api/v1/bootcamps/:bootcampId/courses
 */
export const createCourse: RequestHandler = asyncHandler(
  async (req, res, next) => {
    req.body.bootcampId = req.params.bootcampId
    req.body.userId = res.locals.user.id

    const bootcamp = await prisma.bootcamp.findUnique({
      where: { id: req.params.bootcampId },
    })

    if (!bootcamp) {
      return next(
        new AppError(`Bootcamp not found with id ${req.params.bootcampId}`, 404)
      )
    }

    const course = await prisma.course.create({
      data: req.body,
    })

    res.status(201).json({
      status: 'success',
      message: 'Course created successfully',
      data: course,
    })
  }
)

/**
 * @desc    Update a course
 * @route   PUT /api/v1/courses/:id
 */
export const updateCourse: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const course = await prisma.course.update({
      where: { id: req.params.id },
      data: req.body,
    })

    if (!course) {
      return next(
        new AppError(`Course not found with id ${req.params.id}`, 404)
      )
    }

    res.status(200).json({
      status: 'success',
      message: 'Course updated successfully',
      data: course,
    })
  }
)

/**
 * @desc    Delete a course
 * @route   DELETE /api/v1/courses/:id
 */
export const deleteCourse: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const course = await prisma.course.delete({
      where: { id: req.params.id },
    })

    if (!course) {
      return next(
        new AppError(`Course not found with id ${req.params.id}`, 404)
      )
    }

    res.status(200).json({
      status: 'success',
      message: 'Course deleted successfully',
      data: course,
    })
  }
)
