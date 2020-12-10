const express = require('express')
const router = express.Router({ mergeParams: true })

const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/course.controller')

// advanced results
const Course = require('../models/course.model')
const advRes = require('../middlewares/advResults.middleware')
const populate = { path: 'bootcamp', select: 'name description' }

router.route('/')
.get(advRes(Course, populate), getCourses)
.post(createCourse)

router.route('/:id')
.get(getCourse)
.put(updateCourse)
.delete(deleteCourse)

module.exports = router
