import { Router } from 'express'

import { protect, authorize } from '../middlewares/auth.middleware'
import * as reviewCtrl from '../controllers/review.controller'

const router = Router({ mergeParams: true })

router.get('/', reviewCtrl.findAllByBootcampId)
router.post('/', protect, authorize('user', 'admin'), reviewCtrl.create)

router.put(
    '/reviews/:id',
    protect,
    authorize('user', 'admin'),
    reviewCtrl.update
)

router.delete(
    '/reviews/:id',
    protect,
    authorize('user', 'admin'),
    reviewCtrl.remove
)

export { router as reviewRouter }
