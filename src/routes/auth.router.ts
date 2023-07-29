import { Router } from 'express'
import * as authCtrl from '$/controllers/auth.controller'
import { authenticate } from '$/middlewares/auth.middleware'

const router = Router()

router.post('/sign-up', authCtrl.signUp)
router.post('/sign-in', authCtrl.signIn)
router.post('/sign-out', authCtrl.signOut)
router.get('/current-user', authenticate, authCtrl.currentUser)

router.post('/forgot-password', authCtrl.forgotPassword)

export default router
