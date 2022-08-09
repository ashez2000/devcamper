const express = require('express')
const courseRouter = require('./course.router')
const bootcampCtrl = require('../controllers/bootcamp.controller')

const router = express.Router()

router.use('/:bootcampId/courses', courseRouter)

router
  .route('/')
  .get(bootcampCtrl.getBootcamps)
  .post(bootcampCtrl.createBootcamp)

router
  .route('/:id')
  .get(bootcampCtrl.getBootcamp)
  .put(bootcampCtrl.updateBootcamp)
  .delete(bootcampCtrl.deleteBootcamp)

module.exports = router
