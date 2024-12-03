import { CookieOptions } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { appConfig, jwtConfig } from '../config'

export const getSignedToken = (data: any) => {
  return jwt.sign(data, jwtConfig.secret, {
    expiresIn: jwtConfig.expire,
  })
}

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: appConfig.env === 'production',
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
}

export const verifyPassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword)
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtConfig.secret)
}
