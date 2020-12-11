const asyncHandler = require('../middlewares/async.middleware')
const ErrorResponse = require('../utils/error.util')

const User = require('../models/user.model')

// desc  : register user
// route : GET /api/auth/register | public
exports.register = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body)
    res.status(200).json({ success: true, data: {} })
})