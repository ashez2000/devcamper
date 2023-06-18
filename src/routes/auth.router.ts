import { Router } from 'express'

import { SignInInputSchema, SignUpInputSchema } from '../db/schema/user.schema'
import { zodValidator } from '../middlewares/zod-validator.middleware'
import * as authCtrl from '../controllers/auth.controller'

const router = Router()

router.post('/sign-up', zodValidator(SignUpInputSchema), authCtrl.signUp)
router.post('/sign-in', zodValidator(SignInInputSchema), authCtrl.signIn)

router.post('/forgot-password', authCtrl.forgotPassword)
router.put('/reset-password', authCtrl.resetPassword)

export { router as authRouter }
