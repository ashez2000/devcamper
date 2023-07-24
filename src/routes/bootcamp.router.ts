import { Router } from 'express'
import * as bootcampCtrl from '$/controllers/bootcamp.controller'

const router = Router()

router.get('/', bootcampCtrl.getBootcamps)
router.post('/', bootcampCtrl.createBootcamp)

router.get('/:id', bootcampCtrl.getBootcamp)
router.put('/:id', bootcampCtrl.updateBootcamp)
router.delete('/:id', bootcampCtrl.deleteBootcamp)

export default router
