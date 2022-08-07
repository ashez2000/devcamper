const Course = require('../models/course.model')
const Bootcamp = require('../models/bootcamp.model')
const asyncHandler = require('../middlewares/async.middleware')
const ErrorResponse = require('../utils/error.util')

/**
 * @desc  Get all courses associated with a bootcamp
 * @route GET /api/v1/courses
 * @route GET /api/v1/bootcamps/:bootcampId/courses
 */
exports.getCourses = asyncHandler(async (req, res, next) => {
  const courses = await Course.find({ bootcamp: req.params.bootcampId })

  res.status(200).json({
    status: 'success',
    courses,
  })
})

/**
 * @desc   Get a course by id
 * @route  GET /api/v1/courses/:id
 * @access Private
 */
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id)

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    status: 'success',
    course,
  })
})

/**
 * @desc   Create a course
 * @route  POST /api/v1/bootcamps/:bootcampId/courses
 * @access Private
 */
exports.createCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId
  const bootcamp = await Bootcamp.findById(req.params.bootcampId)

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with id ${req.params.bootcampId}`,
        404
      )
    )
  }

  const course = await Course.create(req.body)

  res.status(201).json({
    status: 'success',
    course,
  })
})

/**
 * @desc   Update a course
 * @route  PUT /api/v1/courses/:id
 * @access Private
 */
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    status: 'success',
    course,
  })
})

/**
 * @desc   Delete a course
 * @route  DELETE /api/v1/courses/:id
 * @access Private
 */
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id)

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    status: 'success',
    course,
  })
})
