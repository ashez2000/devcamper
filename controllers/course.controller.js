const asyncHandler = require('../middlewares/async.middleware')
const ErrorResponse = require('../utils/error.util')

const Course = require('../models/course.model')
const Bootcamp = require('../models/bootcamp.model')

// desc  : gets all bootcamps
// route : GET /api/courses and /api/bootcamps/:bootcampId/courses | public
exports.getCourses = asyncHandler(async (req, res, next) => {
    let q

    if(req.params.bootcampId) {
        q = Course.find({ bootcamp: req.params.bootcampId })
    } else {
        q = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        })
    }

    const courses = await q

    res.status(200).json({ success: true, count: courses.length, data: courses })
})

// desc  : get single course
// route : GET /api/courses and /api/courses/:id | public
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await (await Course.findById(req.params.id)).populate({
        path: 'bootcamp',
        select: 'name description'
    })

    if(!course) {
        return next(new ErrorResponse(`No course with id: ${req.params.id}`, 404))
    }

    res.status(200).json({ success: true, data: course })
})

// desc  : creates course
// route : POST /api/bootcamps/:bootcampId/courses | privete
exports.createCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId

    const bootcamp = await Bootcamp.findById(req.params.bootcampId)
    if(!bootcamp) {
        return next(new ErrorResponse(`No bootcamp with id: ${req.params.bootcampId}`, 404))
    }

    const course = await Course.create(req.body)

    res.status(200).json({ success: true, data: course })
})

// desc  : creates course
// route : PUT /api/courses/:id | privete
exports.updateCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id)
    if(!course) {
        return next(new ErrorResponse(`No course with id: ${req.params.id}`, 404))
    }

    const opt = { new: true, runValidators: true }
    course = await Course.findByIdAndUpdate(req.params.id, req.body, opt)

    res.status(200).json({ success: true, data: course })
})

// desc  : delete course
// route : DELETE /api/courses/:id | privete
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id)
    if(!course) {
        return next(new ErrorResponse(`No course with id: ${req.params.id}`, 404))
    }

    course.remove()

    res.status(200).json({ success: true, data: {} })
})
