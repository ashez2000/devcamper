import { Router } from 'express'
import * as authCtrl from '$/controllers/auth.controller'

const router = Router()

router.post('/sign-up', authCtrl.signUp)
router.post('/sign-in', authCtrl.signIn)
router.post('/sign-out', authCtrl.signOut)
router.get('/current-user', authCtrl.currentUser)

export default router
