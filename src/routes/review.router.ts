import { Router } from 'express'

import { authenticate, authorize } from '$/middlewares/auth.middleware'
import * as reviewCtrl from '$/controllers/review.controller'

const router = Router({ mergeParams: true })

router.get('/', reviewCtrl.getReviews)
router.post(
  '/',
  authenticate,
  authorize('user', 'admin'),
  reviewCtrl.createReview
)

router.put(
  '/:id',
  authenticate,
  authorize('user', 'admin'),
  reviewCtrl.updateReview
)

router.delete(
  '/:id',
  authenticate,
  authorize('user', 'admin'),
  reviewCtrl.deleteReview
)

export default router
