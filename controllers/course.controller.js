const asyncHandler = require('../middlewares/async.middleware')
const ErrorResponse = require('../utils/error.util')

const Course = require('../models/course.model')
const Bootcamp = require('../models/bootcamp.model')

// desc  : gets all bootcamps
// route : GET /api/courses and /api/bootcamps/:bootcampId/courses | public
exports.getCourses = asyncHandler(async (req, res, next) => {
    if(req.params.bootcampId) {
        const courses = await Course.find({ bootcamp: req.params.bootcampId })
        return res.status(200).json({ success: true, count: courses.length, data: courses })
    }

    res.status(200).json(req.advResults)
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
    req.body.user = req.user.id

    const bootcamp = await Bootcamp.findById(req.params.bootcampId)
    if(!bootcamp) {
        return next(new ErrorResponse(`No bootcamp with id: ${req.params.bootcampId}`, 404))
    }

    // user ownership
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`user: ${req.user.id} is not authoerized to create course to this bootcamp`, 401))
    }

    const course = await Course.create(req.body)

    res.status(200).json({ success: true, data: course })
})

// desc  : updates course
// route : PUT /api/courses/:id | privete
exports.updateCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id)
    if(!course) {
        return next(new ErrorResponse(`No course with id: ${req.params.id}`, 404))
    }

    // user ownership
    if(course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`user: ${req.user.id} is not authoerized to update course to this bootcamp`, 401))
    }

    const opt = { new: true, runValidators: true }
    course = await Course.findByIdAndUpdate(req.params.id, req.body, opt)
    course.save()

    res.status(200).json({ success: true, data: course })
})

// desc  : delete course
// route : DELETE /api/courses/:id | privete
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id)
    if(!course) {
        return next(new ErrorResponse(`No course with id: ${req.params.id}`, 404))
    }

    // user ownership
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`user: ${req.user.id} is not authoerized to update course to this bootcamp`, 401))
    }

    course.remove()

    res.status(200).json({ success: true, data: {} })
})
