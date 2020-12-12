const asyncHandler = require('../middlewares/async.middleware')
const ErrorResponse = require('../utils/error.util')

const User = require('../models/user.model')
const { findOneAndUpdate, findById } = require('../models/user.model')

// desc  : get all user
// route : GET /api/users/ | admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(req.advResults)
})

// desc  : get single user
// route : GET /api/users/:id | admin
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if(!user) {
        return next(new ErrorResponse(`no user with id: ${req.params.id}`, 404))
    }

    res.status(200).json({ success: true, data: user })
})

// desc  : create user
// route : POST /api/users/ | admin
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body)
    res.status(200).json({ success: true, data: user })
})

// desc  : update user
// route : PUT /api/users/:id | admin
exports.updateUser = asyncHandler(async (req, res, next) => {
    let user = await User.findById(req.params.id)
    if(!user) {
        return next(new ErrorResponse(`no user with id: ${req.params.id}`, 404))
    }

    const opt = { new: true, runValidators: true }
    user = await User.findOneAndUpdate(req.params.id, req.body, opt)

    res.status(200).json({ success: true, data: user })
})

// desc  : delte user
// route : DELETE /api/users/:id | admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if(!user) {
        return next(new ErrorResponse(`no user with id: ${req.params.id}`, 404))
    }
    user.remove()
    res.status(200).json({ success: true, data: {} })
})
