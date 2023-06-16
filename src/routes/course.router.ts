import { Router } from 'express'
import * as courseController from '../controllers/course.controller'

const router = Router({ mergeParams: true })

router.get('/', courseController.findAll)
router.post('/', courseController.create)

router.get('/:id', courseController.findById)
router.put('/:id', courseController.update)
router.delete('/:id', courseController.remove)

export { router as courseRouter }
