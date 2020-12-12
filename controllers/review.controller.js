const asyncHandler = require('../middlewares/async.middleware')
const ErrorResponse = require('../utils/error.util')

const Review = require('../models/review.model')
const Bootcamp = require('../models/bootcamp.model')

// desc  : gets all reviews
// route : GET /api/reviews and /api/bootcamps/:bootcampId/reviews | public
exports.getReviews = asyncHandler(async (req, res, next) => {
    if(req.params.bootcampId) {
        const reviews = await Review.find({ bootcamp: req.params.bootcampId })
        return res.status(200).json({ success: true, count: reviews.length, data: reviews })
    }

    res.status(200).json(req.advResults)
})

// desc  : get single review
// route : GET /api/reviews/:id | public
exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    })

    if(!review) {
        return next(new ErrorResponse(`no review with id: ${req.params.id}`, 404))
    }

    res.status(200).json({ success: true, data: review })
})

// desc  : add review
// route : POST /api/reviews/:id | private
exports.addReview = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId
    req.body.user = req.user.id

    const bootcamp = await Bootcamp.findById(req.params.bootcampId)
    if(!bootcamp) {
        return next(new ErrorResponse(`no bootcamp with id: ${req.params.id}`))
    }

    const review = await Review.create(req.body)

    res.status(201).json({ success: true, data: review })
})

// desc  : update review
// route : PUT /api/reviews/:id | private
exports.updateReview = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id)
    if(!review) {
        return next(new ErrorResponse(`no review with id: ${req.params.id}`, 404))
    }

    // ownership
    if(review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`user with: ${req.user.id} id not authorizer to update this review`, 401))
    }

    const opt = { new: true, runValidators: true }
    review = await Review.findByIdAndUpdate(req.params.id, req.body, opt)
    review.save()

    res.status(201).json({ success: true, data: review })
})

// desc  : delete review
// route : DELETE /api/reviews/:id | private
exports.deleteReview = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id)
    if(!review) {
        return next(new ErrorResponse(`no review with id: ${req.params.id}`, 404))
    }

    // ownership
    if(review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`user with: ${req.user.id} id not authorizer to update this review`, 401))
    }

    review.remove()

    res.status(201).json({ success: true, data: {} })
})
