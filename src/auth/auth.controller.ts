import { RequestHandler } from 'express'
import argon from 'argon2'
import jwt from 'jsonwebtoken'

import { signToken } from './auth.util'
import config from '../config'
import prisma from '../utils/prisma'
import AppError from '../utils/app-error'
import asyncHandler from '../utils/async-handler'

/**
 * @desc    User signup
 * @route   POST /api/v1/auth/signup
 */
export const signup: RequestHandler = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body

  const hashedPassword = await argon.hash(password)
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
    select: { id: true, name: true, email: true, role: true },
  })

  const token = signToken({ id: user.id, role: user.role })

  res.cookie('token', token, config.COOKIE_CONFIG)
  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    data: { user, token },
  })
})

/**
 * @desc    User signin
 * @route   POST /api/v1/auth/signin
 */
export const signin: RequestHandler = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return next(new AppError('Invalid credentials', 401))
  }

  const isMatch = await argon.verify(user.password, password)
  if (!isMatch) {
    return next(new AppError('Invalid credentials', 401))
  }

  const token = signToken({ id: user.id, role: user.role })

  res.cookie('token', token, config.COOKIE_CONFIG)
  res.status(200).json({
    status: 'success',
    message: 'User logged in successfully',
    data: { user, token },
  })
})

/**
 * @desc    Current user
 * @route   GET /api/v1/auth/profile
 */
export const profile: RequestHandler = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: res.locals.user.id },
    select: { id: true, name: true, email: true, role: true },
  })

  res.status(200).json({
    status: 'success',
    data: user,
  })
})
