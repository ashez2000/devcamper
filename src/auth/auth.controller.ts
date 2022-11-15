import { RequestHandler } from 'express'
import argon from 'argon2'
import jwt from 'jsonwebtoken'

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
  })

  const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  })

  res.cookie('token', token, {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  })
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

  const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  })

  res.cookie('token', token, {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  })
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
  })

  res.status(200).json({
    status: 'success',
    data: user,
  })
})

/** Authencation middleware */
export const protect: RequestHandler = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET)
    res.locals.user = decoded
  } catch (err) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }

  next()
}

/** Role authorization middleware */
export const restrictTo = (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    // roles ['admin', 'publisher', 'user']
    if (!roles.includes(res.locals.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      )
    }

    next()
  }
}
