import express from 'express'
import * as courseCtrl from '../controllers/course.controller'
import { protect, restrictTo } from '../middlewares/auth.middleware'

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(courseCtrl.getAllCourse)
  .post(protect, restrictTo('admin', 'publisher'), courseCtrl.createCourse)

router
  .route('/:id')
  .get(courseCtrl.getAllCourse)
  .put(protect, restrictTo('admin', 'publisher'), courseCtrl.updateCourse)
  .delete(protect, restrictTo('admin', 'publisher'), courseCtrl.deleteCourse)

export default router
