import express from 'express'

import { protect, restrictTo } from '../auth/auth.controller'
import {
  getAllBootcampHandler,
  getBootcampByIdHandler,
  getBootcampWithinRadiusHandler,
  createBootcampHandler,
  updateBootcampByIdHandler,
} from './bootcamp.controller'

const router = express.Router()

/**
 * @openapi
 * /api/v1/bootcamps:
 *  get:
 *    tags:
 *      - Bootcamps
 */
router.get('/', getAllBootcampHandler)

/**
 * @openapi
 * /api/v1/bootcamps/{id}:
 *  get:
 *    tags:
 *      - Bootcamps
 */
router.get('/:id', getBootcampByIdHandler)

/**
 * @openapi
 * /api/v1/bootcamps/radius/{zipcode}/{distance}:
 *  get:
 *    tags:
 *      - Bootcamps
 */
router.get('/radius/:zipcode/:distance', getBootcampWithinRadiusHandler)

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
  createBootcampHandler
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
  updateBootcampByIdHandler
)

export default router
