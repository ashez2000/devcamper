import { HydratedDocument } from 'mongoose'
import { IUser } from './user.model'

export const serializeUser = (user: HydratedDocument<IUser>) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}
