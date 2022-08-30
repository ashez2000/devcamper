import User from './user.model'
import ErrorResponse from '../utils/error.util'
import { SignInData, SignUpData } from '../schemas/auth.schema'

export const createUser = async (data: SignUpData) => {
  return await User.create(data)
}

export const findUserById = async (id: string) => {
  const user = await User.findById(id)

  if (!user) {
    throw new ErrorResponse('User not found', 404)
  }

  return user
}

export const findByUserCredential = async (data: SignInData) => {
  const user = await User.findByCredentials(data.email, data.password)
  return user
}
