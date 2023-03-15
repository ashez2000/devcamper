import express from 'express';
import { Role } from '@prisma/client';

import * as bootcamp from './bootcamp.controller';
import { CreateBootcampSchema } from './bootcamp.schema';
import { validate } from '../utils/validator';
import { protect, restrictTo } from '../auth/auth.util';

import courseRouter from '../course/course.router';
import reviewRouter from '../review/review.router';

const router = express.Router();

router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

/**
 * @openapi
 * /api/v1/bootcamps:
 *  get:
 *    tags:
 *      - Bootcamps
 */
router.get('/', bootcamp.getBootcamps);

/**
 * @openapi
 * /api/v1/bootcamps/{id}:
 *  get:
 *    tags:
 *      - Bootcamps
 */
router.get('/:id', bootcamp.getBootcamp);

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
  restrictTo(Role.PUBLISHER, Role.ADMIN),
  validate(CreateBootcampSchema),
  bootcamp.createBootcamp
);

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
  restrictTo(Role.PUBLISHER, Role.ADMIN),
  bootcamp.updateBootcamp
);

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
  restrictTo(Role.PUBLISHER, Role.ADMIN),
  bootcamp.deleteBootcamp
);

export default router;
