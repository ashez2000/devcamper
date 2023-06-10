import { Router } from 'express'
import * as reviewCtrl from '../controllers/review.controller'

const router = Router()

router.get('/bootcamps/:bootcampId/reviews', reviewCtrl.findAllByBootcampId)
router.post('/bootcamps/:bootcampId/reviews', reviewCtrl.create)

router.put('/reviews/:id', reviewCtrl.update)
router.delete('/reviews/:id', reviewCtrl.remove)

export { router as reviewRouter }
