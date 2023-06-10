import { Router } from 'express'
import * as bootcampCtrl from '../controllers/bootcamp.controller'

const router = Router()

router.get('/', bootcampCtrl.findAll)
router.post('/', bootcampCtrl.create)

router.get('/:id', bootcampCtrl.findById)
router.put('/:id', bootcampCtrl.update)
router.delete('/:id', bootcampCtrl.remove)

export { router as bootcampRouter }
