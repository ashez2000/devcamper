import express from 'express'

import { protect, restrictTo } from '../auth/auth.controller'
import {
  getAllBootcampHandler,
  getBootcampByIdHandler,
  createBootcampHandler,
  updateBootcampByIdHandler,
} from './bootcamp.controller'

const router = express.Router()

router.get('/', getAllBootcampHandler)
router.get('/:id', getBootcampByIdHandler)

router.post(
  '/',
  protect,
  restrictTo('admin', 'publisher'),
  createBootcampHandler
)

router.put(
  '/:id',
  protect,
  restrictTo('admin', 'publisher'),
  updateBootcampByIdHandler
)

export default router
