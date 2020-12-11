const asyncHandler = require('../middlewares/async.middleware')
const ErrorResponse = require('../utils/error.util')

const User = require('../models/user.model')

// desc  : register user
// route : POST /api/auth/register | public
exports.register = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body)
    const token = user.getSignedToken()
    res.status(200).json({ success: true, token })
})

// desc  : login user
// route : POST /api/auth/login | public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    if(!email || !password) {
        return next(new ErrorResponse('please provide an email and password', 400))
    }

    // verify email and password
    const user = await User.findOne({ email }).select('+password')
    if(!user) {
        return next(new ErrorResponse('invalid credentials', 401))
    }
    const isMatch = await user.matchPassword(password)
    if(!isMatch) {
        return next(new ErrorResponse('invalid credentials', 401))
    }

    const token = user.getSignedToken()
    res.status(200).json({ success: true, token })
})

// desc  : get logged user
// route : GET /api/auth/me | privete
exports.getLoggedUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({ success: true, data: user })
})
