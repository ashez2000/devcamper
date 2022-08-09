const asyncHandler = require('../middlewares/async.middleware')
const coureService = require('../services/courses.service')

/**
 * @desc  Get all courses associated with a bootcamp
 * @route GET /api/v1/bootcamps/:bootcampId/courses
 * @access Public
 */
exports.getCourses = asyncHandler(async (req, res, next) => {
  const courses = await coureService.find(req.params.bootcampId)

  res.status(200).json({
    results: courses.length,
    courses,
  })
})

/**
 * @desc  Get single course
 * @route GET /api/v1/bootcamps/:bootcampId/courses/:id
 * @access Public
 */
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await coureService.findOne(req.params.id)

  res.status(200).json({
    course,
  })
})

/**
 * @desc  Create a new course
 * @route POST /api/v1/bootcamps/:bootcampId/courses
 * @access Private
 */
exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await coureService.create(req.body)

  res.status(201).json({
    course,
  })
})

/**
 * @desc  Update a course
 * @route PUT /api/v1/bootcamps/:bootcampId/courses/:id
 * @access Private
 */
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await coureService.update(req.params.id, req.body)

  res.status(200).json({
    course,
  })
})

/**
 * @desc  Delete a course
 * @route DELETE /api/v1/bootcamps/:bootcampId/courses/:id
 * @access Private
 */
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await coureService.delete(req.params.id)

  res.status(200).json({
    course,
  })
})
