import { Request, Response } from 'express';

import { signToken } from './auth.util';
import * as userService from '../user/user.service';
import AppError from '../utils/app-error';

/**
 * @desc    User signup
 * @route   POST /api/v1/auth/signup
 */
export async function signUp(req: Request, res: Response) {
  const user = await userService.createUser(req.body);
  const token = signToken({ id: user.id, role: user.role });

  res.cookie('token', token);
  res.status(201).json({ data: { token } });
}

/**
 * @desc    User signin
 * @route   POST /api/v1/auth/signin
 */
export async function signin(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isMatch = await userService.cmpPassword(user.password, password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = signToken({ id: user.id, role: user.role });

  res.cookie('token', token);
  res.status(201).json({ data: { token } });
}

/**
 * @desc    Current user
 * @route   GET /api/v1/auth/profile
 */
export async function profile(req: Request, res: Response) {
  const currentUser = res.locals.user;
  const user = await userService.getUserById(currentUser.id);

  res.status(200).json({ data: { ...user, password: undefined } });
}
