import express from 'express'
import { protect } from '../auth/auth.controller'
import * as course from './course.controller'

const router = express.Router({ mergeParams: true })

/**
 * @openapi
 * /api/v1/courses:
 *  get:
 *    tags:
 *      - Courses
 */
router.get('/', course.getAllCourse)

/**
 * @openapi
 * /api/v1/courses/{id}:
 *  get:
 *    tags:
 *      - Courses
 */
router.get('/:id', course.getCourse)

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}/courses:
 *  post:
 *    tags:
 *      - Bootcamps
 */
router.post('/', protect, course.createCourse)

/**
 * @openapi
 * /api/v1/courses/{id}:
 *  put:
 *    tags:
 *      - Courses
 */
router.put('/:id', protect, course.updateCourse)

/**
 * @openapi
 * /api/v1/courses/{id}:
 *  delete:
 *    tags:
 *      - Courses
 */
router.delete('/:id', protect, course.deleteCourse)

export default router
