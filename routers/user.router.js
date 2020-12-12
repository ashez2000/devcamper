const express = require('express')
const router = express.Router()

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user.controller')

// advanced results
const User = require('../models/user.model')
const advRes = require('../middlewares/advResults.middleware')

// auth middleware
const { protect, authorize } = require('../middlewares/auth.middleware')

router.route('/')
.get(advRes(User), protect, authorize('admin'), getUsers)
.post(protect, authorize('admin'), createUser)

router.route('/:id')
.get(protect, authorize('admin'), getUser)
.put(protect, authorize('admin'), updateUser)
.delete(protect, authorize('admin'), deleteUser)

module.exports = router