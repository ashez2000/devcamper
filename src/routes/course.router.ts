import { Router } from 'express'
import * as courseCtrl from '$/controllers/course.controller'

const router = Router({ mergeParams: true })

/**
 * @openapi
 * /api/v1/courses:
 *  get:
 *   tags:
 *   - Course
 */
/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}/courses:
 *  get:
 *   tags:
 *   - Course
 */
router.get('/', courseCtrl.getCourses)

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}/courses:
 *  post:
 *   tags:
 *   - Course
 */
router.post('/', courseCtrl.createCourse)

/**
 * @openapi
 * /api/v1/courses/{courseId}:
 *  get:
 *   tags:
 *   - Course
 */
router.get('/:id', courseCtrl.getCourse)

/**
 * @openapi
 * /api/v1/courses/{courseId}:
 *  put:
 *   tags:
 *   - Course
 */
router.put('/:id', courseCtrl.updateCourse)

/**
 * @openapi
 * /api/v1/courses/{courseId}:
 *  delete:
 *   tags:
 *   - Course
 */
router.delete('/:id', courseCtrl.deleteCourse)

export default router
