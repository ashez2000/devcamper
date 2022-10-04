import express from 'express'

import { signin, signup, user, protect } from './auth.controller'

const router = express.Router()

router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/user').get(protect, user)

export default router
