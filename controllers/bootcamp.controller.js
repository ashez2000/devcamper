const asyncHandler = require('../middlewares/async.middleware')
const ErrorResponse = require('../utils/error.util')
const geocoder = require('../utils/geocoder.util')

const Bootcamp = require('../models/bootcamp.model')

// desc  : gets all bootcamps
// route : GET /api/bootcamps | public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(req.advResults)
})

// desc  : gets a single bootcamp
// route : GET /api/bootcamps/:id | public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
    return next(new ErrorResponse(`no bootcamp with id: ${req.params.id}`, 404))
  }

  res.status(200).json({ success: true, data: bootcamp })
})

// desc  : creates a bootcamp
// route : POST /api/bootcamps | private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id

  // only one bootcamp
  // admin can create multiples
  const publised = await Bootcamp.findOne({ user: req.user.id })
  if (publised && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `user with id: ${req.user.id} already publised a bootcamp`
      )
    )
  }

  const bootcamp = await Bootcamp.create(req.body)
  res.status(201).json({ success: true, data: bootcamp })
})

// desc  : updates a bootcamp
// route : PUT /api/bootcamps/:id | private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id)
  if (!bootcamp) {
    return next(new ErrorResponse(`no bootcamp with id: ${req.params.id}`, 404))
  }

  // user ownership
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `user: ${req.user.id} is not authoerized to update this bootcamp`,
        401
      )
    )
  }

  const opt = { new: true, runValidators: true }
  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, opt)

  res.status(200).json({ success: true, data: bootcamp })
})

// desc  : gets all bootcamps
// route : DELETE /api/bootcamps | private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
    return next(new ErrorResponse(`no bootcamp with id: ${req.params.id}`, 404))
  }

  // user ownership
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `user: ${req.user.id} is not authoerized to delete this bootcamp`,
        401
      )
    )
  }

  bootcamp.remove()

  res.status(200).json({ success: true, data: {} })
})

// desc  : gets all bootcamps in radius
// route : GET /api/bootcamps/radius/:zipcode/:distance | private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params

  const loc = await geocoder.geocode(zipcode)

  const lat = loc[0].latitude
  const lng = loc[0].longitude

  const radius = distance / 3963

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  })

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps })
})
