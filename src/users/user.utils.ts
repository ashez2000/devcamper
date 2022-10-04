import { HydratedDocument } from 'mongoose'
import { IUser } from './user.model'

import { UserDto } from './user.dto'

export const serializeUser = (user: HydratedDocument<IUser>): UserDto => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}
