import { Router } from 'express'
import * as authCtrl from '@/controllers/auth.controller'

const router = Router()

router.post('/signup', authCtrl.signup)
router.post('/signin', authCtrl.signin)
router.post('/signout', authCtrl.signout)
router.get('/profile', authCtrl.profile)

router.post('/forgot-password', authCtrl.forgotPassword)
router.put('/reset-password/:resetToken', authCtrl.resetPassword)

export default router
