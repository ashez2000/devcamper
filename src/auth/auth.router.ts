import express from 'express';

import * as auth from './auth.controller';
import { protect } from './auth.util';
import { validate } from '../utils/validator';
import { SignInSchema, SignUpSchema } from './auth.schema';

const router = express.Router();

/**
 * @openapi
 * /api/v1/auth/signup:
 *  post:
 *    tags:
 *      - Auth
 */
router.post('/signup', validate(SignUpSchema), auth.signUp);

/**
 * @openapi
 * /api/v1/auth/signin:
 *  post:
 *    tags:
 *      - Auth
 */
router.post('/signin', validate(SignInSchema), auth.signin);

/**
 * @openapi
 * /api/v1/auth/profile:
 *  get:
 *    tags:
 *      - Auth
 */
router.get('/profile', protect, auth.profile);

export default router;
