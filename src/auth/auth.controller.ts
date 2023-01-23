import { RequestHandler } from 'express';
import argon from 'argon2';

import { signToken, getCurrentUser } from './auth.util';
import * as userService from '../user/user.service';
import AppError from '../utils/app-error';

/**
 * @desc    User signup
 * @route   POST /api/v1/auth/signup
 */
export const signup: RequestHandler = async (req, res) => {
  const user = await userService.createUser(req.body);
  const token = signToken({ id: user.id, role: user.role });

  res.status(201).json({
    data: { token },
  });
};

/**
 * @desc    User signin
 * @route   POST /api/v1/auth/signin
 */
export const signin: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);
  if (!user) throw new AppError('Invalid credentials', 401);

  const isMatch = await argon.verify(user.password, password);
  if (!isMatch) throw new AppError('Invalid credentials', 401);

  const token = signToken({ id: user.id, role: user.role });

  res.status(200).json({
    data: { token },
  });
};

/**
 * @desc    Current user
 * @route   GET /api/v1/auth/profile
 */
export const profile: RequestHandler = async (req, res) => {
  const currentUser = getCurrentUser(req);
  const data = await userService.getUserById(currentUser.id);

  res.status(200).json({
    data: { user: data },
  });
};
