const express = require('express')
const router = express.Router({ mergeParams: true })

const courseCtrl = require('../controllers/course.controller')

router.route('/').get(courseCtrl.getCourses).post(courseCtrl.createCourse)

router
  .route('/:id')
  .get(courseCtrl.getCourse)
  .put(courseCtrl.updateCourse)
  .delete(courseCtrl.deleteCourse)

module.exports = router
