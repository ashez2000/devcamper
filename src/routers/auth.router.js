const express = require('express')
const router = express.Router()

const {
  register,
  login,
  getLoggedUser,
  updateUser,
  updatePassword,
} = require('../controllers/auth.controller')

// auth middleware
const { protect } = require('../middlewares/auth.middleware')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/me').get(protect, getLoggedUser)
router.route('/updatedetails').put(protect, updateUser)
router.route('/updatepassword').put(protect, updatePassword)

module.exports = router
