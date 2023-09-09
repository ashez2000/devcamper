import { Router } from 'express'
import courseRoutes from '$/routes/course.router'
import * as bootcampCtrl from '$/controllers/bootcamp.controller'

const router = Router()

router.use('/:bootcampId/courses', courseRoutes)

/**
 * @openapi
 * /api/v1/bootcamps:
 *  get:
 *   tags:
 *   - Bootcamp
 */
router.get('/', bootcampCtrl.getBootcamps)

/**
 * @openapi
 * /api/v1/bootcamps:
 *  post:
 *   tags:
 *   - Bootcamp
 */
router.post('/', bootcampCtrl.createBootcamp)

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}:
 *  get:
 *   tags:
 *   - Bootcamp
 */
router.get('/:id', bootcampCtrl.getBootcamp)

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}:
 *  put:
 *   tags:
 *   - Bootcamp
 */
router.put('/:id', bootcampCtrl.updateBootcamp)

/**
 * @openapi
 * /api/v1/bootcamps/{bootcampId}:
 *  delete:
 *   tags:
 *   - Bootcamp
 */
router.delete('/:id', bootcampCtrl.deleteBootcamp)

export default router
