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

router.get('/', getAllCourseHandler)

router.get('/:bootcampId/courses', getAllCourseForBootcampHandler)

router.get('/courses/:id', getCourseByIdHandler)

router.post(
  '/:bootcampId/courses',
  protect,
  restrictTo('publisher', 'admin'),
  createCourseHandler
)

router.put(
  '/courses/:id',
  protect,
  restrictTo('publisher', 'admin'),
  updateCourseByIdHandler
)

router.patch(
  '/courses/:id',
  protect,
  restrictTo('publisher', 'admin'),
  updateCourseByIdHandler
)

export default router
