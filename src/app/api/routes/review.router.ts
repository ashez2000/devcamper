import { Router } from 'express'

import { protect, authorize } from '../middlewares/auth.middleware'
import * as reviewCtrl from '../controllers/review.controller'

const router = Router()

router.get('/bootcamps/:bootcampId/reviews', reviewCtrl.findAllByBootcampId)

router.post(
    '/bootcamps/:bootcampId/reviews',
    protect,
    authorize('publisher', 'admin'),
    reviewCtrl.create
)

router.put(
    '/reviews/:id',
    protect,
    authorize('user', 'admin'),
    reviewCtrl.update
)

router.delete(
    '/reviews/:id',
    protect,
    authorize('publisher', 'admin'),
    reviewCtrl.remove
)

export { router as reviewRouter }
