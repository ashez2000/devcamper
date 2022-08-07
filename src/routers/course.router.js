const express = require('express')
const router = express.Router({ mergeParams: true })

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/course.controller')

// advanced results
const Course = require('../models/course.model')
const advRes = require('../middlewares/advResults.middleware')
const populate = { path: 'bootcamp', select: 'name description' }

// auth middleware
const { protect, authorize } = require('../middlewares/auth.middleware')

router
  .route('/')
  .get(advRes(Course, populate), getCourses)
  .post(protect, authorize('admin', 'publisher'), createCourse)

router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('admin', 'publisher'), updateCourse)
  .delete(protect, authorize('admin', 'publisher'), deleteCourse)

module.exports = router
