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
  if (!email || !password) {
    return next(new ErrorResponse('please provide an email and password', 400))
  }

  // verify email and password
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    return next(new ErrorResponse('invalid credentials', 401))
  }
  const isMatch = await user.matchPassword(password)
  if (!isMatch) {
    return next(new ErrorResponse('invalid credentials', 401))
  }

  const token = user.getSignedToken()
  res.status(200).json({ success: true, token })
})

// desc  : get logged user
// route : GET /api/auth/me | private
exports.getLoggedUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  res.status(200).json({ success: true, data: user })
})

// desc  : update details of user
// route : PUT /api/auth/updatedetails | private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const fields = {
    name: req.body.name,
    email: req.body.email,
  }

  const opt = { new: true, runValidators: true }
  const user = await User.findByIdAndUpdate(req.user.id, fields, opt)

  res.status(200).json({ success: true, data: user })
})

// desc  : update password of user
// route : PUT /api/auth/updatedetails | private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body
  const user = await User.findById(req.user.id).select('+password')

  // check current password
  const isMatch = await user.matchPassword(currentPassword)
  if (!isMatch) {
    return next(new ErrorResponse('incorrect password', 401))
  }

  user.password = newPassword
  await user.save()

  const token = user.getSignedToken()

  res.status(200).json({ success: true, token })
})
