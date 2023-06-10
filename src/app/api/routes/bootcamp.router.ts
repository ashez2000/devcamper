import { Router } from 'express'

import { protect, authorize } from '../middlewares/auth.middleware'
import * as bootcampCtrl from '../controllers/bootcamp.controller'

const router = Router()

router.get('/', bootcampCtrl.findAll)
router.post('/', protect, authorize('publisher', 'admin'), bootcampCtrl.create)

router.get(
    '/:id',
    protect,
    authorize('publisher', 'admin'),
    bootcampCtrl.findById
)

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
