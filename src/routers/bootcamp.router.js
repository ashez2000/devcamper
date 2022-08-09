const express = require('express')
const courseRouter = require('./course.router')
const reviewRouter = require('./review.router')
const bootcampCtrl = require('../controllers/bootcamp.controller')

const { protect, restrictTo } = require('../middlewares/auth.middleware')

const router = express.Router()

router.use('/:bootcampId/courses', courseRouter)
router.use('/:bootcampId/reviews', reviewRouter)

router
  .route('/')
  .get(bootcampCtrl.getBootcamps)
  .post(protect, restrictTo('admin', 'publisher'), bootcampCtrl.createBootcamp)

router
  .route('/:id')
  .get(bootcampCtrl.getBootcamp)
  .put(protect, restrictTo('admin', 'publisher'), bootcampCtrl.updateBootcamp)
  .delete(
    protect,
    restrictTo('admin', 'publisher'),
    bootcampCtrl.deleteBootcamp
  )

module.exports = router
