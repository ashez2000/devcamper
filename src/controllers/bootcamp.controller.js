const asyncHandler = require('../middlewares/async.middleware')
const ErrorResponse = require('../utils/error.util')
const bootcampService = require('../services/bootcamps.service')

/**
 * @desc    Get all bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await bootcampService.find()

  return res.status(200).json({
    results: bootcamps.length,
    bootcamps,
  })
})

/**
 * @desc    Get single bootcamp
 * @route   GET /api/v1/bootcamps/:id
 * @access  Public
 */
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await bootcampService.findById(req.params.id)

  return res.status(200).json({
    bootcamp,
  })
})

/**
 * @desc    Create bootcamp
 * @route   POST /api/v1/bootcamps
 * @access  Private
 */
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id
  const bootcamp = await bootcampService.create(req.body)

  return res.status(201).json({
    bootcamp,
  })
})

/**
 * @desc    Update bootcamp
 * @route   PUT /api/v1/bootcamps/:id
 * @access  Private
 */
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await bootcampService.findById(req.params.id)

  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this bootcamp`,
        401
      )
    )
  }

  bootcamp = await bootcampService.update(req.params.id, req.body)

  return res.status(200).json({
    bootcamp,
  })
})

/**
 * @desc    Delete bootcamp
 * @route   DELETE /api/v1/bootcamps/:id
 * @access  Private
 */
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await bootcampService.findById(req.params.id)

  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this bootcamp`,
        401
      )
    )
  }

  return res.status(200).json({
    bootcamp,
  })
})
