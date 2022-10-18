import express from 'express'
import { protect, restrictTo } from '../auth/auth.controller'
import {
  getAllCourseHandler,
  getAllCourseForBootcampHandler,
  getCourseByIdHandler,
  createCourseHandler,
  updateCourseByIdHandler,
  deleteCourseByIdHandler,
} from './course.controller'

const router = express.Router()

/**
 * @openapi
 * /api/v1/courses:
 *  get:
 *    tags:
 *      - Courses
 */
router.get('/', getAllCourseHandler)

/**
 * @openapi
 * /api/v1/courses/{id}:
 *  get:
 *    tags:
 *      - Courses
 */
router.get('/:id', getCourseByIdHandler)

/**
 * @openapi
 * /api/v1/courses/{id}:
 *  post:
 *    tags:
 *      - Courses
 */
router.post(
  '/:bootcampId/courses',
  protect,
  restrictTo('publisher', 'admin'),
  createCourseHandler
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
  // protect,
  // restrictTo('publisher', 'admin'),
  updateCourseByIdHandler
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
  // protect,
  // restrictTo('publisher', 'admin'),
  deleteCourseByIdHandler
)

export default router
