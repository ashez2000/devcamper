import User from './user.model'
import ErrorResponse from '../utils/error.util'
import { SigninData, SignupData } from './users.validator'

export const createUser = async (data: SigninData) => {
  return await User.create(data)
}

export const findUserById = async (id: string) => {
  const user = await User.findById(id)

  if (!user) {
    throw new ErrorResponse('User not found', 404)
  }

  return user
}
export const findByUserCredential = async (data: SigninData) => {
  const user = await User.findByCredentials(data.email, data.password)
  return user
}
