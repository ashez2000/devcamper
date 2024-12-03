import express from 'express'

import { protect, restrictTo } from '../middlewares/auth.middleware'
import * as courseHandler from './course.controller'

const router = express.Router()

/**
 * @openapi
 * /api/v1/courses:
 *  get:
 *    tags:
 *      - Courses
 */
router.get('/', courseHandler.getCourses)

/**
 * @openapi
 * /api/v1/courses/{id}:
 *  get:
 *    tags:
 *      - Courses
 */
router.get('/:id', courseHandler.getCourse)

/**
 * @openapi
 * /api/v1/courses:
 *  post:
 *    tags:
 *      - Courses
 */
router.post(
  '/',
  protect,
  restrictTo('publisher', 'admin'),
  courseHandler.createCourse
)

/**
 * @openapi
 * /api/v1/courses/{id}:
 *  put:
 *    tags:
 *      - Courses
 */
router.put(
  '/:id',
  protect,
  restrictTo('publisher', 'admin'),
  courseHandler.updateCourse
)

/**
 * @openapi
 * /api/v1/courses/{id}:
 *  delete:
 *    tags:
 *      - Courses
 */
router.delete(
  '/:id',
  protect,
  restrictTo('publisher', 'admin'),
  courseHandler.deleteCourse
)

export default router
