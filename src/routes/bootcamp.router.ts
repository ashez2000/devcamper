import { Router } from 'express'
import courseRoutes from '$/routes/course.router'
import * as bootcampCtrl from '$/controllers/bootcamp.controller'

const router = Router()

router.use('/:bootcampId/courses', courseRoutes)

router.get('/', bootcampCtrl.getBootcamps)
router.post('/', bootcampCtrl.createBootcamp)

router.get('/:id', bootcampCtrl.getBootcamp)
router.put('/:id', bootcampCtrl.updateBootcamp)
router.delete('/:id', bootcampCtrl.deleteBootcamp)

export default router
