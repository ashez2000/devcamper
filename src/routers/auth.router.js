const express = require('express')
const router = express.Router()

const authCtrl = require('../controllers/auth.controller')

// auth middleware
const { protect } = require('../middlewares/auth.middleware')

router.route('/signup').post(authCtrl.signup)
router.route('/signin').post(authCtrl.signin)
router.route('/user').get(protect, authCtrl.getUser)

module.exports = router
