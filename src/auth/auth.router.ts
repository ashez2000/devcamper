import express from 'express'
import * as auth from './auth.controller'

const router = express.Router()
router.route('/signup').post(auth.signup)
router.route('/signin').post(auth.signin)

export default router
