import User from './user.model'
import AppError from '../utils/app-error'
import { CreateUserDto } from './user.dto'

export const createUser = async (data: CreateUserDto) => {
  return await User.create(data)
}

export const getUserById = async (id: string) => {
  const user = await User.findById(id)
  if (!user) throw new AppError('User not found', 404)
  return user
}
