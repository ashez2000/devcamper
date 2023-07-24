import { Router } from 'express'
import * as courseCtrl from '$/controllers/course.controller'

const router = Router({ mergeParams: true })

router.get('/', courseCtrl.getCourses)
router.post('/', courseCtrl.createCourse)
router.get('/:id', courseCtrl.getCourse)

router.put('/:id', courseCtrl.updateCourse)
router.delete('/:id', courseCtrl.deleteCourse)

export default router
