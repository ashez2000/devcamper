const express = require('express')
const router = express.Router()

const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius
} = require('../controllers/bootcamp.controller')

// advanced results
const Bootcamp = require('../models/bootcamp.model')
const advRes = require('../middlewares/advResults.middleware')

// route forward
const courseRouter = require('./course.router')

router.use('/:bootcampId/courses', courseRouter)


router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router.route('/')
.get(advRes(Bootcamp, 'course'), getBootcamps)
.post(createBootcamp)

router.route('/:id')
.get(getBootcamp)
.put(updateBootcamp)
.delete(deleteBootcamp)

module.exports = router
