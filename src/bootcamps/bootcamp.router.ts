import express from 'express'

import courseRouter from '../routes/course.router'
import reviewRouter from '../routes/review.router'
import { protect, restrictTo } from '../middlewares/auth.middleware'
import * as bootcampCtrl from './bootcamp.controller'

const router = express.Router()

router.use('/:bootcampId/courses', courseRouter)
router.use('/:bootcampId/reviews', reviewRouter)

router
  .route('/')
  .get(bootcampCtrl.getBootcamps)
  .post(protect, restrictTo('admin', 'publisher'), bootcampCtrl.createBootcamp)

router
  .route('/:id')
  .get(bootcampCtrl.getBootcamp)
  .put(protect, restrictTo('admin', 'publisher'), bootcampCtrl.updateBootcamp)
  .delete(
    protect,
    restrictTo('admin', 'publisher'),
    bootcampCtrl.deleteBootcamp
  )

export default router