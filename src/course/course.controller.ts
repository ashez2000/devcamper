import { Request, Response } from 'express'
import * as bootcamp from '../bootcamp/bootcamp.service'
import * as course from './courses.service'
import AppError from '../utils/app-error'

/**
 * Get courses
 * @route GET /courses
 */
export async function getCourses(req: Request, res: Response) {
  const q = req.query as any
  const courses = await course.findCourses(q)
  res.status(200).json({
    results: courses.length,
    courses,
  })
}

/**
 * Get course
 * @route GET /courses/{id}
 */
export async function getCourse(req: Request, res: Response) {
  const c = await course.findCourse(req.params.id)
  res.status(200).json({
    course: c,
  })
}

/**
 * Create course
 * @route POST /courses
 */
export async function createCourse(req: Request, res: Response) {
  req.body.user = res.locals.user.id

  await bootcamp.findBootcamp(req.body.bootcamp)
  const c = await course.createCourse(req.body)
  res.status(201).json({
    course: c,
  })
}

/**
 * Update course
 * @route PUT /courses/{id}
 */
export async function updateCourse(req: Request, res: Response) {
  const curUser = res.locals.user
  const c = await course.findCourse(req.params.id)
  if (c.user.toString() != curUser.id && curUser.role != 'admin') {
    throw new AppError('unauthorized', 403)
  }

  const update = await course.updateCourse(req.params.id, req.body)
  res.status(200).json({
    course: update,
  })
}

/**
 * Delete course
 * @route DELETE /courses/{id}
 */
export async function deleteCourse(req: Request, res: Response) {
  const curUser = res.locals.user
  const c = await course.findCourse(req.params.id)
  if (c.user.toString() != curUser.id && curUser.role != 'admin') {
    throw new AppError('unauthorized', 403)
  }

  await course.deleteCourse(req.params.id)
  res.status(200).json({
    course: c,
  })
}
