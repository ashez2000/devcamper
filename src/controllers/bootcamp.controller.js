const asyncHandler = require('../middlewares/async.middleware')
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
  const bootcamp = await bootcampService.update(req.params.id, req.body)

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
  const bootcamp = await bootcampService.delete(req.params.id)

  return res.status(200).json({
    bootcamp,
  })
})
