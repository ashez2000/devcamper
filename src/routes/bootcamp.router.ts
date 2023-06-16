import { Router } from 'express'

import { reviewRouter } from './review.router'
import { protect, authorize } from '../middlewares/auth.middleware'
import * as bootcampCtrl from '../controllers/bootcamp.controller'

const router = Router()

router.use('/:bootcampId/reviews', reviewRouter)

router.get('/', bootcampCtrl.findAll)
router.post('/', protect, authorize('publisher', 'admin'), bootcampCtrl.create)

router.get('/:id', bootcampCtrl.findById)

router.put(
    '/:id',
    protect,
    authorize('publisher', 'admin'),
    bootcampCtrl.update
)

router.delete(
    '/:id',
    protect,
    authorize('publisher', 'admin'),
    bootcampCtrl.remove
)

export { router as bootcampRouter }
