import express from 'express'

import { protect, restrictTo } from '../middlewares/auth.middleware'
import * as bootcampHandler from './bootcamp.controller'

const router = express.Router()

/**
 * @openapi
 * /api/v1/bootcamps:
 *  get:
 *    tags:
 *      - Bootcamps
 */
router.get('/', bootcampHandler.getBootcamps)

/**
 * @openapi
 * /api/v1/bootcamps/{id}/courses:
 *  get:
 *    tags:
 *      - Bootcamps
 */
router.get('/:id/courses', bootcampHandler.getBootcampCourses)

/**
 * @openapi
 * /api/v1/bootcamps/{id}:
 *  get:
 *    tags:
 *      - Bootcamps
 */
router.get('/:id', bootcampHandler.getBootcamp)

/**
 * @openapi
 * /api/v1/bootcamps:
 *  post:
 *    tags:
 *      - Bootcamps
 */
router.post(
  '/',
  protect,
  restrictTo('admin', 'publisher'),
  bootcampHandler.createBootcamp
)

/**
 * @openapi
 * /api/v1/bootcamps/{id}:
 *  put:
 *    tags:
 *      - Bootcamps
 */
router.put(
  '/:id',
  protect,
  restrictTo('admin', 'publisher'),
  bootcampHandler.updateBootcamp
)

/**
 * @openapi
 * /api/v1/bootcamps/{id}:
 *  delete:
 *    tags:
 *      - Bootcamps
 */
router.delete(
  '/:id',
  protect,
  restrictTo('admin', 'publisher'),
  bootcampHandler.deleteBootcamp
)

export default router
