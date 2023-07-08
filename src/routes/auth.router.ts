import { Router } from 'express'

import { createUserSchema, userCredentialSchema } from '$/schemas/user.schema'
import { zodValidator } from '$/middlewares/zod-validator.middleware'
import * as authCtrl from '$/controllers/auth.controller'

const router = Router()

router.post('/sign-up', zodValidator(createUserSchema), authCtrl.signUp)
router.post('/sign-in', zodValidator(userCredentialSchema), authCtrl.signIn)

router.post('/forgot-password', authCtrl.forgotPassword)
router.put('/reset-password', authCtrl.resetPassword)

export { router as authRouter }
