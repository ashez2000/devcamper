const express = require('express')
const courseCtrl = require('../controllers/course.controller')
const { protect, restrictTo } = require('../middlewares/auth.middleware')

const router = express.Router({ mergeParams: true })

router.route('/').get(courseCtrl.getCourses).post(courseCtrl.createCourse)

router
  .route('/:id')
  .get(courseCtrl.getCourse)
  .put(protect, restrictTo('admin', 'publisher'), courseCtrl.updateCourse)
  .delete(protect, restrictTo('admin', 'publisher'), courseCtrl.deleteCourse)

module.exports = router
