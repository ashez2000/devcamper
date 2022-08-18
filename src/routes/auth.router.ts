import express from 'express'
const router = express.Router()

import * as authCtrl from '../controllers/auth.controller'
import { protect } from '../middlewares/auth.middleware'

router.route('/signup').post(authCtrl.signup)
router.route('/signin').post(authCtrl.signin)
router.route('/user').get(protect, authCtrl.getUser)

export default router
