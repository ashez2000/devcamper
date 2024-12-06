import { Request, Response } from 'express'

import AppError from '../utils/app-error'
import * as course from '../course/courses.service'
import * as bootcamp from './bootcamp.service'

/**
 * Get bootcamps
 * @route GET /bootcamps
 */
export async function getBootcamps(req: Request, res: Response) {
  const q = req.query as any
  const bootcamps = await bootcamp.findBootcamps(q)
  res.status(200).json({
    results: bootcamps.length,
    bootcamps,
  })
}

/**
 * Get bootcamps
 * @route GET /bootcamps/{id}
 */
export async function getBootcamp(req: Request, res: Response) {
  const b = await bootcamp.findBootcamp(req.params.id)
  res.status(200).json({
    bootcamp: b,
  })
}

/**
 * Get courses for bootcamp
 * @route GET /bootcamps/{id}/courses
 */
export async function getBootcampCourses(req: Request, res: Response) {
  const courses = await course.findCoursesForBootcamp(
    req.params.id,
    req.query as any
  )
  res.status(200).json({
    results: courses.length,
    courses,
  })
}

/**
 * Create bootcamp
 * @route POST /bootcamps
 */
export async function createBootcamp(req: Request, res: Response) {
  req.body.user = res.locals.user.id
  const b = await bootcamp.createBootcamp(req.body)
  res.status(201).json({
    bootcamp: b,
  })
}

/**
 * Update bootcamp
 * @route PUT /bootcamps/{id}
 */
export async function updateBootcamp(req: Request, res: Response) {
  const curUser = res.locals.user

  const b = await bootcamp.findBootcamp(req.params.id)
  if (b.user.toString() != curUser.id && curUser.role != 'admin') {
    throw new AppError('unauthorized', 403)
  }

  const update = await bootcamp.updateBootcamp(req.params.id, req.body)
  res.status(200).json({
    bootcamp: update,
  })
}

/**
 * Delete bootcamp
 * @route DELETE /bootcamps/{id}
 */
export async function deleteBootcamp(req: Request, res: Response) {
  const curUser = res.locals.user

  const b = await bootcamp.findBootcamp(req.params.id)
  if (b.user.toString() != curUser.id && curUser.role != 'admin') {
    throw new AppError('unauthorized', 403)
  }

  await bootcamp.deleteBootcamp(req.params.id)
  res.status(200).json({
    bootcamp: b,
  })
}
