const asyncHandler = require('../middlewares/async.middleware')
const ErrorResponse = require('../utils/error.util')
const geocoder = require('../utils/geocoder.util')

const Bootcamp = require('../models/bootcamp.model')

// desc  : gets all bootcamps
// route : GET /api/bootcamps | public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    let query = { ...req.query }

    const fieldsToExclude = ['select', 'sort', 'page', 'limit']
    fieldsToExclude.forEach(param => delete query[param])

    let q = Bootcamp.find(query)

    // select query
    if(req.query.select) {
        const fields = req.query.select.split(',').join(' ')
        q = q.select(fields)
    }

    // sort query
    if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        q = q.sort(sortBy)
    } else {
        q = q.sort('-createdAt')
    }

    // pagination
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.page, 10) || 20
    const s = (page - 1) * limit
    const e = page * limit
    const total = await Bootcamp.countDocuments()
    q = q.skip(s).limit(limit)

    // executing query
    const bootcamps = await q

    // pagination res
    let pagination = {}

    if (e < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if (s > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    res.status(200).json({success: true, count: bootcamps.length, pagination, data: bootcamps}) 
})

// desc  : gets a single bootcamp
// route : GET /api/bootcamps/:id | public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)

    if(!bootcamp) {
        return next(new ErrorResponse(`No bootcamp with id: ${req.params.id}`, 404))
    }

    res.status(200).json({success: true, data: bootcamp}) 
})

// desc  : creates a bootcamp
// route : POST /api/bootcamps | private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(200).json({success: true, data: bootcamp}) 
})

// desc  : updates a bootcamp
// route : PUT /api/bootcamps/:id | private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const opt = {
        new: true,
        runValidators: true
    }
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, opt)

    if(!bootcamp) {
        return next(new ErrorResponse(`No bootcamp with id: ${req.params.id}`, 404))
    }

    res.status(200).json({success: true, data: bootcamp}) 
})

// desc  : gets all bootcamps
// route : DELETE /api/bootcamps | private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

    if(!bootcamp) {
        return next(new ErrorResponse(`No bootcamp with id: ${req.params.id}`, 404))
    }

    res.status(200).json({success: true, data: {}}) 
})

// desc  : gets all bootcamps in radius
// route : DELETE /api/bootcamps/radius/:zipcode/:distance | private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params

    const loc = await geocoder.geocode(zipcode)

    const lat = loc[0].latitude
    const lng = loc[0].longitude

    const radius = distance / 3963

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    })

    res.status(200).json({success: true, count: bootcamps.length, data: bootcamps }) 
})
