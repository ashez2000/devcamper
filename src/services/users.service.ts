import User from '../models/user.model'
import ErrorResponse from '../utils/error.util'
import { SignInData, SignUpData } from '../schemas/auth.schema'

class UserNotFound extends ErrorResponse {
  constructor(id: string) {
    super(`Bootcamp with id ${id} not found`, 404)
  }
}

/**
 * Create new user
 */
export const createUser = async (data: SignUpData) => {
  const user = await User.create(data)
  return user
}

/**
 * Get user by id
 */
export const findUserById = async (id: string) => {
  const user = await User.findById(id)
  if (!user) throw new UserNotFound(id)
  return user
}

/**
 * Find user by credentials
 */
export const findByUserCredential = async (data: SignInData) => {
  const user = await User.findByCredentials(data.email, data.password)
  return user
}
