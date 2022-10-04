import jwt from 'jsonwebtoken'
import argon from 'argon2'
import { CookieOptions } from 'express'

import config from '../config'
import { Types } from 'mongoose'

export const getSignedToken = (data: any) => {
  return jwt.sign(data, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  })
}

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === 'production',
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
}

export const verifyPassword = (password: string, hashedPassword: string) => {
  return argon.verify(hashedPassword, password)
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET)
}

export const isAuthorized = (
  ownerId: Types.ObjectId | undefined,
  currentUser: { id: string; role: string }
) => {
  if (!ownerId) return false
  return ownerId.toString() === currentUser.id || currentUser.role === 'admin'
}
