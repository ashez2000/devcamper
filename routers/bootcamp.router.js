const express = require('express')
const router = express.Router()

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require('../controllers/bootcamp.controller')

// advanced results
const Bootcamp = require('../models/bootcamp.model')
const advRes = require('../middlewares/advResults.middleware')

// auth middleware
const { protect, authorize } = require('../middlewares/auth.middleware')

// route forward
const courseRouter = require('./course.router')
const reviewRouter = require('./review.router')

router.use('/:bootcampId/courses', courseRouter)
router.use('/:bootcampId/reviews', reviewRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router
  .route('/')
  .get(advRes(Bootcamp, 'course'), getBootcamps)
  .post(protect, authorize('admin', 'publisher'), createBootcamp)

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('admin', 'publisher'), updateBootcamp)
  .delete(protect, authorize('admin', 'publisher'), deleteBootcamp)

module.exports = router
