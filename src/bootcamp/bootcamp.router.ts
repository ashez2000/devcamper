import express from 'express'
import * as bootcamp from './bootcamp.controller'

const router = express.Router()

/**
 * @openapi
 * /api/v1/bootcamps:
 *  get:
 *    tags:
 *      - Bootcamps
 */
router.get('/', bootcamp.getAllBootcamps)

/**
 * @openapi
 * /api/v1/bootcamps/{id}:
 *  get:
 *    tags:
 *      - Bootcamps
 */
router.get('/:id', bootcamp.getBootcamp)

/**
 * @openapi
 * /api/v1/bootcamps:
 *  post:
 *    tags:
 *      - Bootcamps
 */
router.post('/', bootcamp.createBootcamp)

/**
 * @openapi
 * /api/v1/bootcamps/{id}:
 *  put:
 *    tags:
 *      - Bootcamps
 */
router.put('/:id', bootcamp.updateBootcamp)

/**
 * @openapi
 * /api/v1/bootcamps/{id}:
 *  delete:
 *    tags:
 *      - Bootcamps
 */
router.delete('/:id', bootcamp.deleteBootcamp)

export default router
